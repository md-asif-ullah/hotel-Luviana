"use client";

import {
  FormControl,
  FormField as RHFFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

export enum FormFieldTypes {
  Input = "input",
  TextArea = "textarea",
}

interface FormProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  FieldType: FormFieldTypes;
  type: string;
}

function FormField({
  props,
  field,
  id,
}: {
  props: FormProps;
  field: any;
  id: string;
}) {
  const { placeholder, FieldType, type } = props;
  switch (FieldType) {
    case FormFieldTypes.Input:
      return (
        <FormControl>
          <Input
            type={type}
            className="text-black focus-visible:ring-0 focus-visible:border-primary2"
            id={id}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
      );
    case FormFieldTypes.TextArea:
      return (
        <FormControl>
          <Textarea
            className="text-black"
            id={id}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
      );
    default:
      return null;
  }
}

function CustomForm(props: FormProps) {
  const { control, name, label } = props;
  const id = `field-${name}`;

  return (
    <RHFFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={id} className="text-black">
            {label}
          </FormLabel>

          <FormField props={props} field={field} id={id} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomForm;
