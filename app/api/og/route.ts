import type { NextRequest } from "next/server";

type OgResult = {
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
  tag: string;
};

function isPrivateHostname(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (lower === "localhost" || lower.endsWith(".local")) return true;

  const ipv4 = lower.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const a = Number(ipv4[1]);
    const b = Number(ipv4[2]);
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    return false;
  }

  if (lower === "::1" || lower.startsWith("fc") || lower.startsWith("fd") || lower.startsWith("fe80")) {
    return true;
  }

  return false;
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

function metaPatterns(property: string): RegExp[] {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [
    new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${escaped}["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${escaped}["']`, "i"),
  ];
}

function extractMetaContent(html: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return null;
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return Response.json({ error: "url query parameter is required" }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return Response.json({ error: "invalid url" }, { status: 400 });
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return Response.json({ error: "only http/https urls are supported" }, { status: 400 });
  }

  if (isPrivateHostname(parsedUrl.hostname)) {
    return Response.json({ error: "this host cannot be fetched" }, { status: 400 });
  }

  const fallback: OgResult = {
    url: parsedUrl.toString(),
    title: parsedUrl.hostname,
    description: "",
    thumbnail: null,
    tag: parsedUrl.hostname,
  };

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0)" },
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });

    if (!response.ok) {
      return Response.json(fallback);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return Response.json(fallback);
    }

    const html = await response.text();
    const finalUrl = new URL(response.url || parsedUrl.toString());

    const rawTitle =
      extractMetaContent(html, metaPatterns("og:title")) ??
      html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ??
      fallback.title;

    const rawDescription =
      extractMetaContent(html, metaPatterns("og:description")) ??
      extractMetaContent(html, metaPatterns("description")) ??
      "";

    const rawThumbnail = extractMetaContent(html, metaPatterns("og:image"));
    let thumbnail: string | null = null;
    if (rawThumbnail) {
      try {
        thumbnail = new URL(decodeHtmlEntities(rawThumbnail), finalUrl).toString();
      } catch {
        thumbnail = null;
      }
    }

    const result: OgResult = {
      url: finalUrl.toString(),
      title: decodeHtmlEntities(rawTitle),
      description: decodeHtmlEntities(rawDescription),
      thumbnail,
      tag: finalUrl.hostname,
    };

    return Response.json(result);
  } catch {
    return Response.json(fallback);
  }
}
