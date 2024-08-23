"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomForm from "../CustomForm";
import SecondaryButton from "../SecondaryButton";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

export enum FormFieldTypes {
  Input = "input",
  TextArea = "textarea",
}

const formSchema = z.object({
  name: z.string().min(4).max(20),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

function ContactForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/user-messages", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error("Failed to submit form");
      }
      const data = await res.json();
      if (data?.success) {
        setLoading(false);
        form.reset();
        toast({
          title: "Message send successfully",
          description: "Thanks for your feedback",
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Message cannot be send",
        description: "Please try again later",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomForm
          FieldType={FormFieldTypes.Input}
          control={form.control}
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
        />
        <CustomForm
          FieldType={FormFieldTypes.Input}
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <CustomForm
          FieldType={FormFieldTypes.TextArea}
          control={form.control}
          name="message"
          type="text"
          label="Message"
          placeholder="Enter your Message"
        />
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

export default ContactForm;
