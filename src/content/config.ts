import { defineCollection, z } from "astro:content";

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    img: z.string(),
    location: z.string(),
    location_url: z.string().url(),
    date: z.date(),
    hour: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "La hora debe estar en formato HH:mm (24 horas)",
    }),
  }),
});

export const collections = { events };
