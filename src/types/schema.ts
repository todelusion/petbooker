import { z } from "zod";

export const countySchema = z.object({
  countyItems: z.object({
    countyItem: z.array(
      z.object({
        countycode: z.string(),
        countyname: z.string(),
        countycode01: z.string(),
      })
    ),
  }),
});

export type CountyList = z.infer<typeof countySchema>;
