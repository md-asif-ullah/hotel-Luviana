import { z } from "zod";

export const addRoomFormSchema = z.object({
  name: z.string().min(3).max(255),
  categories: z.string().min(3).max(20),
  adults: z.string().min(1).max(10),
  children: z.string(),
  view: z.string().min(3).max(20),
  size: z.string().min(1).max(10),
  bedType: z.string().min(3).max(20),
  amenities: z.string().min(10).max(500),
  description: z.string().min(50).max(500),
  price: z.string().min(1).max(10),
});
