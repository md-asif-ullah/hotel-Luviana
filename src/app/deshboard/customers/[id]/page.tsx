"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import CustomForm, { FormFieldTypes } from "@/components/CustomForm";
import SecondaryButton from "@/components/SecondaryButton";
import { Form } from "@/components/ui/form";
import type { IUserType } from "@/types/index";
import Loading from "@/components/Loading";
import { useToast } from "@/components/ui/use-toast";
import { editCustomerFormSchema } from "@/lib/zodValidation";

function EditCustomer() {
  const [data, setData] = useState<IUserType | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof editCustomerFormSchema>>({
    resolver: zodResolver(editCustomerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      isAdmin: "",
      isBanned: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    async function getCustomers() {
      try {
        const res = await axios.get(`/api/user/${id}`);
        if (res.data.success) {
          setData(res.data.payload);
          setLoading(false);
        }
        if (!res.data.success) {
          setError("User does not exist with this ID");
          setLoading(false);
        }
      } catch (error: any) {
        setError("Something went wrong , please try again later");
        setLoading(false);
      }
    }

    getCustomers();
  }, [id]);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        isAdmin: data.isAdmin.toString() || "",
        isBanned: data.isBanned.toString() || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: z.infer<typeof editCustomerFormSchema>) => {
    const newData = {
      ...data,
      isAdmin: data.isAdmin === "true",
      isBanned: data.isBanned === "true",
    };

    try {
      const res = await axios.put(`/api/user/${id}`, { data: newData });
      if (res.data.success) {
        toast({
          title: "Success",
          description: "User updated successfully",
        });
        router.push("/deshboard/customers");
      }
      if (!res.data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.data.message,
        });
      }
    } catch (error: any) {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong, please try again later",
      });
    }
  };

  // loading and error handling
  if (isLoading || error) {
    return (
      <div className="h-screen w-full pt-20">
        {isLoading && <Loading />}
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#020817] min-h-[85vh]">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl ml-4 mt-10 sm:ml-6 md:ml-10">
        Edit Customer
      </h1>

      <div className="border dark:border-[#1e293b] border-[#e2e8f0] md:mx-10 mb-14 m-5 rounded-lg">
        <div className="p-6 rounded-md shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomForm
                FieldType={FormFieldTypes.Input}
                control={form.control}
                name="name"
                label="Name"
                type="text"
                placeholder="Enter name"
              />
              <CustomForm
                FieldType={FormFieldTypes.Input}
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter Email"
              />
              <CustomForm
                FieldType={FormFieldTypes.PHONEINPUT}
                control={form.control}
                name="phoneNumber"
                label="Phone"
                type="text"
                placeholder="Enter Phone"
              />
              <div className="grid md:grid-cols-2 gap-7">
                <CustomForm
                  FieldType={FormFieldTypes.SWITCH}
                  control={form.control}
                  name="isAdmin"
                  label="Role"
                  title="Role"
                  firstItemValue="User"
                  secondItemValue="Admin"
                />

                <CustomForm
                  FieldType={FormFieldTypes.SWITCH}
                  control={form.control}
                  name="isBanned"
                  label="Status"
                  title="Status"
                  firstItemValue="Active"
                  secondItemValue="Banned"
                />
              </div>

              <SecondaryButton type="submit" text="Save Changes" />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditCustomer;
