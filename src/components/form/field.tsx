import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { CircleX } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import type { ZodError } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export type FieldError = ZodError;

export type FieldProps = {
	label?: string;
	containerClassName?: string;
	className?: string;
	description?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	noLabel?: boolean;
	layout?: "horizontal" | "vertical";
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export function FormItem({
	className,
	children,
	disabled,
}: {
	className?: string;
	children: ReactNode;
	disabled?: boolean;
}) {
	return (
		<div className={cn("group space-y-2", className)} data-disabled={disabled}>
			{children}
		</div>
	);
}

export function FormDescription({ description }: { description?: string }) {
	if (!description) {
		return null;
	}

	return (
		<div className="text-sm text-muted-foreground group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50">
			{description}
		</div>
	);
}

export function FormError({ error }: { error?: FieldError | string }) {
	if (!error) {
		return null;
	}

	const errorValue = typeof error === "string" ? error : error.message;
	return (
		<div className="flex gap-x-2 items-center text-sm text-red-500">
			<CircleX className="size-4" />
			{errorValue}
		</div>
	);
}

export function FormLabel({
	label,
	name,
	required,
}: {
	label?: string;
	name: string;
	required?: boolean;
}) {
	return (
		<Label htmlFor={name} className="gap-1 text-white text-lg">
			{label}
			{required && <span className="text-red-500">*</span>}
		</Label>
	);
}

export type TextFieldProps = FieldProps & ComponentProps<"input">;

export function TextField({
	label,
	description,
	required,
	containerClassName,
	className,
	disabled,
	type = "text",
	layout = "vertical",
	...inputProps
}: TextFieldProps) {
	const { name, state, handleChange, handleBlur } =
		useFieldContext<typeof type extends "number" ? number : string>();

	const InputComponent = Input;
	// if (type === 'number') {
	//   InputComponent = NumericInput;
	// }

	if (layout === "horizontal") {
		return (
			<FormItem className={containerClassName} disabled={disabled}>
				<div className="flex items-center gap-x-2">
					<div className="space-y-0.5 w-40 max-w-40">
						<FormLabel name={name} label={label} required={required} />
						<FormDescription description={description} />
					</div>
					<InputComponent
						name={name}
						id={name}
						value={state.value}
						onChange={(e) => handleChange(e.target.value)}
						onBlur={handleBlur}
						className={cn("text-lg", className)}
						disabled={disabled}
						aria-invalid={!!state.meta.errors[0]}
						{...inputProps}
					/>
				</div>
				<FormError error={state.meta.errors[0]} />
			</FormItem>
		);
	}

	return (
		<FormItem className={containerClassName} disabled={disabled}>
			<div className="space-y-0.5">
				<FormLabel name={name} label={label} required={required} />
				<FormDescription description={description} />
			</div>
			<InputComponent
				name={name}
				id={name}
				value={state.value}
				onChange={(e) => handleChange(e.target.value)}
				onBlur={handleBlur}
				className={className}
				disabled={disabled}
				aria-invalid={!!state.meta.errors[0]}
				{...inputProps}
			/>
			<FormError error={state.meta.errors[0]} />
		</FormItem>
	);
}

export function CheckboxField({
	label,
	required,
	description,
	containerClassName,
	className,
	disabled,
}: FieldProps) {
	const { name, state, handleChange } = useFieldContext<boolean>();
	console.log("ASDASD")
	return (
		<FormItem
			className={cn("flex gap-x-2 items-center", containerClassName)}
			disabled={disabled}
		>
			<Checkbox
				name={name}
				className={cn("size-4 mb-0", className)}
				checked={state.value}
				onCheckedChange={(checked) => {
					handleChange(checked === "indeterminate" ? false : checked);
				}}
				disabled={disabled}
			/>
			<div className="flex gap-y-2 flex-col items-center">
				<FormLabel name={name} label={label} required={required} />
				<FormDescription description={description} />
			</div>
		</FormItem>
	);
}

export type SubmitButtonProps = {
	label?: string;
	className?: string;
	IconComponent?: React.ComponentType<React.ComponentProps<"svg">>;
};

export function SubmitButton({
	label,
	className,
	IconComponent,
}: SubmitButtonProps) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
			{([canSubmit, isSubmitting]) => (
				<Button
					type="submit"
					disabled={!canSubmit || isSubmitting}
					className={className}
				>
					{IconComponent && <IconComponent />}
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	// We'll learn more about these options later
	fieldComponents: {
		TextField,
		CheckboxField,
	},
	formComponents: {
		SubmitButton,
	},
});
