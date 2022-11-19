import { z } from "zod";

// eslint-disable-next-line import/prefer-default-export
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
