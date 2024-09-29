import { defineCollection, z } from "astro:content";

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    img: z.string(),
    location: z.string(),
    location_url: z.string().url(),
    date: z.string(),
  }),
});

export const collections = { events };
