// index.ts
import { corsHeaders } from "./_shared/cors.ts";
import { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  // Manejar solicitudes preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    res.writeHead(200, corsHeaders);
    res.end("ok");
    return;
  }

  // Manejar otras solicitudes (ejemplo: POST)
  if (req.method === "POST") {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const { name } = JSON.parse(body);
        const responseData = { message: `Hello ${name}!` };

        res.writeHead(200, {
          ...corsHeaders,
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(responseData));
      });
    } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      res.writeHead(400, {
        ...corsHeaders,
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ error: errorMessage }));
    }
  }
}
