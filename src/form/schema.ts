import z from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .max(255, 'Venue name exceeded 255 characters')
    .nonempty('Venue name is required'),
  sku: z.string(),
  unitPrice: z.number().gte(0),
  isPowerpack: z.boolean(),
  powerpackQuantity: z.number().gte(0),
  powerpackPrice: z.number().gte(0),
  visible: z.boolean(),
});