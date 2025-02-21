import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import example from "./data/example.json";
import microfrontend from "./microfrontend";

const api = new Hono();


// Enable CORS for all routes
api.use("/*", cors({
  origin: "http://localhost:4321",
  credentials: true,
}));

api.get('/api/sokos-utbetalingsportalen-astro', (c) => {
  return c.json(example);
});

api.get('/attestasjon/bundle.js', (c) => {
  return new Response(microfrontend, {
    headers: {
      "Content-Type": "application/javascript",
    }
  });
});


serve(api);
