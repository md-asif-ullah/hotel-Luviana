"use client";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { Form } from "../ui/form";
import CustomForm, { FormFieldTypes } from "../CustomForm";
import { useEffect, useState } from "react";
import SecondaryButton from "../SecondaryButton";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(3).max(255),
  gender: z.string().optional(),
});

function InformationSection() {
  const [showInfo, setShowInfo] = useState(true);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "",
    },
  });

  useEffect(() => {
    form.setValue("name", user?.name!);
    form.setValue("gender", user?.gender);
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.put(`/api/profile/${user?._id}`, values);

      if (res.data.success) {
        toast({
          title: "Success",
          description: "Information updated successfully",
        });
      }

      if (!res.data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.data.message || "failed to update",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "failed to update",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white  p-4 md:p-6 rounded-lg shadow-xl space-y-6">
      <section className="md:flex justify-between items-center">
        <h3 className="md:text-4xl text-2xl text-slate-700  font-medium">
          Personal Information
        </h3>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-[#717aa1] text-sm mt-4 cursor-pointer"
        >
          change information
        </button>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomForm
            FieldType={FormFieldTypes.Input}
            control={form.control}
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            showInfo={showInfo}
          />
          <CustomForm
            FieldType={FormFieldTypes.select}
            control={form.control}
            name="gender"
            label="Gender"
            value={["Male", "Female"]}
            showInfo={showInfo}
          />

          <SecondaryButton
            type="submit"
            text="Save Changes"
            loading={loading}
          />
        </form>
      </Form>
    </div>
  );
}

export default InformationSection;
