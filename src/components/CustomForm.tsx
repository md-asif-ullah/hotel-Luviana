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
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export enum FormFieldTypes {
  Input = "input",
  TextArea = "textarea",
  PHONEINPUT = "phoneInput",
  PAYMENTMETHOD = "paymentMethod",
  SWITCH = "switch",
}

interface FormProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  FieldType: FormFieldTypes;
  type?: string;
  firstItemValue?: string;
  secondItemValue?: string;
  title?: string;
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
  const {
    placeholder,
    FieldType,
    type,
    firstItemValue,
    secondItemValue,
    title,
  } = props;
  switch (FieldType) {
    case FormFieldTypes.Input:
      return (
        <FormControl>
          <Input
            type={type}
            value={field.value}
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
            className="text-black focus-visible:ring-0 focus-visible:border-primary2"
            id={id}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
      );
    case FormFieldTypes.PHONEINPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            id={id}
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone focus-within:ring-0 focus-within:border-primary2 mt-2 h-11 rounded-md px-3 text-sm border placeholder:text-black"
          />
        </FormControl>
      );
    case FormFieldTypes.PAYMENTMETHOD:
      return (
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="mt-2"
          >
            <FormItem className="space-x-3">
              <FormControl>
                <RadioGroupItem value="pay-on-arrival" />
              </FormControl>
              <div className="inline-grid">
                <FormLabel className="text-black text-lg cursor-pointer">
                  Pay on Arrival
                </FormLabel>
                <p className="text-gray-600 text-sm mt-1">
                  Pay with cash upon arrival.
                </p>
              </div>
            </FormItem>
            <FormItem className="space-x-3">
              <FormControl>
                <RadioGroupItem value="pay-by-stripe" />
              </FormControl>
              <div className="inline-grid">
                <FormLabel className="text-black text-lg cursor-pointer">
                  Pay by Card (Stripe)
                </FormLabel>
                <p className="text-gray-600 text-sm mt-1">
                  Pay with your credit card using Stripe.
                </p>
              </div>
            </FormItem>
          </RadioGroup>
        </FormControl>
      );
    case FormFieldTypes.SWITCH:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger id={id} className="focus-within:border-primary2">
              <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">{firstItemValue}</SelectItem>
              <SelectItem value="true">{secondItemValue}</SelectItem>
            </SelectContent>
          </Select>
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
          {label && <FormLabel htmlFor={id}>{label}</FormLabel>}

          <FormField props={props} field={field} id={id} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomForm;
