import { z } from "zod";

export const countySchema = z.array(
  z.object({ Id: z.number(), Areas: z.string() })
);

export type CountyList = z.infer<typeof countySchema>;
