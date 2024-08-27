"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomForm, { FormFieldTypes } from "@/components/CustomForm";
import SecondaryButton from "@/components/SecondaryButton";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { loginFormSchema } from "@/lib/zodValidation";
import Link from "next/link";
import InfomationSection from "@/components/InfomationSection";

function RegisterForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const newFormData = {
      email: values.email,
      password: values.password,
    };

    try {
      setLoading(true);

      const res = await fetch("/api/userLogin", {
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
        router.push(`/`);
        toast({
          title: "success",
          description: "You have successfully logged in.",
        });
      }
      if (!data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data?.message || "failed to login",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "failed to login",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-4 md:p-8 rounded-lg shadow-lg">
        <InfomationSection
          title="Login"
          description="welcome back, please login to your account."
        />
        <section className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* email */}
              <CustomForm
                FieldType={FormFieldTypes.Input}
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />

              {/* password */}
              <CustomForm
                FieldType={FormFieldTypes.Input}
                control={form.control}
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />

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
        </section>
        <p className="dark:text-white text-black mt-3 text-sm">
          don&apos;t have an account?
          <Link href="/register" className="text-[#1f4ace] ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
