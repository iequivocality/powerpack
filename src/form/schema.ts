import z from "zod";

export const productSchema = z.object({
	name: z
		.string()
		.max(100, "Product name exceeded 100 characters")
		.nonempty("Product name is required"),
	sku: z.string(),
	unitPrice: z.number().gte(0),
	isPowerpack: z.boolean(),
	powerpackQuantity: z.number().gte(0),
	powerpackPrice: z.number().gte(0),
});
