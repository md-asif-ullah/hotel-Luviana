"use client";

import CustomForm, { FormFieldTypes } from "@/components/CustomForm";
import MainHeader from "@/components/MainHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SecondaryButton from "@/components/SecondaryButton";
import { BookingInformationFormSchema } from "@/lib/zodValidation";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/components/hooks/useAuth";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

function BookingInformation() {
  const [paymentMethod, setPaymentMethod] = useState<string>("pay-on-arrival");
  const [tramsAndConditions, setTermsAndConditions] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const search = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();

  const data = JSON.parse(search.get("newFormData")!);

  const form = useForm<z.infer<typeof BookingInformationFormSchema>>({
    resolver: zodResolver(BookingInformationFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: "",
      message: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof BookingInformationFormSchema>
  ) {
    const newFormData = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      message: values.message,
      paymentMethod: paymentMethod,
      ...data,
    };

    try {
      setLoading(true);
      const res = await axios.post("/api/booking", newFormData);

      if (res.data.success) {
        form.reset();
        toast({
          title: "success",
          description: "Booking created successfully",
        });
      }

      if (!res.data.success) {
        toast({
          variant: "destructive",
          title: "error",
          description: res.data.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "error",
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen h-full bg-white p-6 md:p-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mt-10 md:mt-28 text-center">
            <MainHeader title="Booking Confirmation" />
          </div>

          <div className="max-w-4xl mx-auto">
            <section className=" bg-white p-8 md:p-12 shadow-lg rounded-lg mt-10">
              <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
              <p className="text-gray-600 mb-2">
                Check-in:
                <span className="font-bold ml-3">{data.checkIn}</span>, from
                11:00 pm
              </p>
              <p className="text-gray-600 mb-6">
                Check-out:
                <span className="ml-3 font-bold">{data.checkOut}</span>, until
                10:00 am
              </p>
            </section>

            <section className=" bg-white p-8 md:p-12 shadow-lg rounded-lg mt-10">
              <h2 className="text-2xl font-semibold mb-4">Your Information</h2>

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
                FieldType={FormFieldTypes.PHONEINPUT}
                control={form.control}
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
              />
              <CustomForm
                FieldType={FormFieldTypes.TextArea}
                control={form.control}
                name="message"
                label="Message (Optional)"
                type="text"
                placeholder="Enter your message"
              />
            </section>

            <section className="py-10">
              <div className="bg-white p-8 md:p-12 shadow-lg rounded-lg mt-10">
                <h2 className="text-2xl font-semibold mb-6">
                  Payment Information
                </h2>

                <RadioGroup
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPaymentMethod(event.target.value)
                  }
                  defaultValue={paymentMethod}
                  className="space-y-6"
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem
                      value="pay-on-arrival"
                      id="method1"
                      className="mt-2"
                    />
                    <div>
                      <Label
                        htmlFor="method1"
                        className="text-black text-lg cursor-pointer"
                      >
                        Pay on Arrival
                      </Label>
                      <p className="text-gray-600 text-sm">
                        Pay with cash upon arrival.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem
                      value="pay-by-stripe"
                      id="method2"
                      className="mt-2"
                    />
                    <div>
                      <Label
                        htmlFor="method2"
                        className="text-black text-lg cursor-pointer"
                      >
                        Pay by Card (Stripe)
                      </Label>
                      <p className="text-gray-600 text-sm">
                        Pay with your credit card using Stripe.
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </section>

            <section className="p-4 bg-white">
              <p className="text-lg font-semibold mb-4">
                Total Price : ${data.totalPrice}
              </p>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="terms&conditions"
                  onClick={() => setTermsAndConditions((prev) => !prev)}
                  className="data-[state=checked]:bg-[#1f4ace] data-[state=checked]:text-white"
                />
                <Label
                  htmlFor="terms&conditions"
                  className="cursor-pointer text-sm"
                >
                  I agree to the
                  <a
                    href="#"
                    className="text-primary2 underline ml-1 hover:text-primary2-dark"
                  >
                    Terms & Conditions
                  </a>
                </Label>
              </div>
            </section>

            <SecondaryButton
              loading={loading}
              text="Book Now"
              type="submit"
              disabled={tramsAndConditions || loading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

export default BookingInformation;
