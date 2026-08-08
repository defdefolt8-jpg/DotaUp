/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { getMarketPayload, syncSteamCatalog } from "./market-sync";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (url.pathname === "/api/market-items" && request.method === "GET") {
      try {
        const payload = await getMarketPayload(env, ctx);
        return Response.json(payload, {
          headers: {
            "cache-control": "no-store",
          },
        });
      } catch (error) {
        return Response.json({
          status: "error",
          message: error instanceof Error ? error.message : "Failed to load Steam Market data",
        }, { status: 500 });
      }
    }

    if (url.pathname === "/api/market-sync" && request.method === "POST") {
      try {
        const rows = await syncSteamCatalog(env);
        return Response.json({
          status: "live",
          syncedAt: rows.length ? rows[0].updated_at : new Date().toISOString(),
          count: rows.length,
        });
      } catch (error) {
        return Response.json({
          status: "error",
          message: error instanceof Error ? error.message : "Steam sync failed",
        }, { status: 500 });
      }
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
