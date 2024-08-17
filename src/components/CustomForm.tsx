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
}

interface FormFieldProps {
  FieldType: FormFieldTypes;
  placeholder?: string;
  id: string;
  field: any;
}

function FormField({ FieldType, placeholder, id, field }: FormFieldProps) {
  switch (FieldType) {
    case FormFieldTypes.Input:
      return (
        <Input
          className="text-black"
          id={id}
          placeholder={placeholder}
          {...field}
        />
      );
    case FormFieldTypes.TextArea:
      return (
        <Textarea
          className="text-black"
          id={id}
          placeholder={placeholder}
          {...field}
        />
      );
    default:
      return null;
  }
}

function CustomForm({
  control,
  name,
  label,
  FieldType,
  placeholder,
}: FormProps) {
  const id = `field-${name}`;

  return (
    <RHFFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={id}>{label}</FormLabel>

          <FormControl>
            <FormField
              FieldType={FieldType}
              id={id}
              placeholder={placeholder}
              field={field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomForm;
