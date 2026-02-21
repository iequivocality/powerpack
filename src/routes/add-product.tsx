import { formOptions } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useAppForm } from "@/components/form/field";
import { productSchema } from "@/form/schema";

export const Route = createFileRoute("/add-product")({
	component: RouteComponent,
	loader: () => ({
		state: {},
	}),
});

const defaultProductValues = {
	name: "",
	sku: "",
	unitPrice: 0,
	isPowerpack: false,
	powerpackQuantity: 12,
	powerpackPrice: 0,
};

const formOpts = formOptions({
	defaultValues: defaultProductValues,
});

const handleProduct = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new Error("Invalid form data");
		}
		return data;
	})
	.handler((ctx) => {
		const newProduct = productSchema.parse(ctx.data);
		console.log(newProduct);
		// create new product here
	});

function RouteComponent() {
	const form = useAppForm({
		defaultValues: defaultProductValues,
		validators: {
			onChange: ({ value }) => {
				const changeCheck = productSchema.safeParse(value);
				if (!changeCheck.success) {
					return changeCheck.error;
				}
			},
		},
	});

	return (
		<>
			<h1 className="text-xl font-semibold text-white">Add product</h1>
			<div className="min-h-screen gap-4 mt-8">
				<form
					action={handleProduct.url}
					method="post"
					encType={"multipart/form-data"}
					className="flex flex-col space-y-6 w-64"
				>
					<form.AppField
						name="name"
						children={(field) => (
							<field.TextField
								name={field.name}
								value={form.state.values.name}
								label="Name"
								className="w-full"
							/>
						)}
					/>
					<form.AppField
						name="sku"
						children={(field) => (
							<field.TextField
								name={field.name}
								value={form.state.values.sku}
								label="SKU"
								className="w-full"
							/>
						)}
					/>
					<form.AppField
						name="isPowerpack"
						children={(field) => (
							<field.CheckboxField
								label="Powerpack Product?"
							/>
						)}
					/>
					<form.AppForm>
						<form.SubmitButton label={"Submit"} />
					</form.AppForm>
				</form>
			</div>
		</>
	);
}
