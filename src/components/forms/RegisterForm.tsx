"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomForm from "../CustomForm";
import SecondaryButton from "../SecondaryButton";
import { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "../ui/use-toast";
import { registerFormSchema } from "@/lib/zodValidation";
import { useRouter } from "next/navigation";

export enum FormFieldTypes {
  Input = "input",
  TextArea = "textarea",
}

function RegisterForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    if (values.password !== values.confirmPassword) {
      setError("Password and Confirm Password should be same");
      return;
    }

    const newFormData = {
      name: values.firstName + " " + values.lastName,
      email: values.email,
      password: values.password,
    };

    try {
      setError("");
      setLoading(true);

      const res = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      if (!res.ok) {
        throw new Error("failed to register");
      }

      const data = await res.json();

      if (data.success) {
        form.reset();
        router.push(`/verify/${encodeURIComponent(data?.payload?.email)}`);
        toast({
          title: "success",
          description:
            "A verification code has been sent to your email. Please verify your email",
        });
      }
      if (!data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data?.message || "failed to register",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "failed to register",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-5">
          {/* user first name */}
          <CustomForm
            FieldType={FormFieldTypes.Input}
            control={form.control}
            name="firstName"
            label="First Name"
            type="text"
            placeholder="Enter your first name"
          />

          {/* user last name */}

          <CustomForm
            FieldType={FormFieldTypes.Input}
            control={form.control}
            name="lastName"
            label="Last Name (Optional)"
            type="text"
            placeholder="Enter your last name"
          />
        </div>

        {/* user email */}
        <CustomForm
          FieldType={FormFieldTypes.Input}
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        {/* user password */}
        <CustomForm
          FieldType={FormFieldTypes.Input}
          control={form.control}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
        />

        {/* user confirm password */}
        <CustomForm
          FieldType={FormFieldTypes.Input}
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm your password"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex space-x-3 items-center">
          <Checkbox
            id="show-password"
            checked={showPassword}
            onCheckedChange={() => setShowPassword((prev) => !prev)}
            className="data-[state=checked]:bg-[#1f4ace] data-[state=checked]:text-white"
          />
          <Label htmlFor="show-password" className="cursor-pointer">
            Show Password
          </Label>
        </div>

        <SecondaryButton
          loading={loading}
          type="submit"
          text="Send Message"
          className="w-full"
        />
      </form>
    </Form>
  );
}

export default RegisterForm;
