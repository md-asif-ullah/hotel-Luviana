"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import CustomForm, { FormFieldTypes } from "./CustomForm";
import { useEffect } from "react";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  bookingStatus: z.string(),
});

type propstype = { bookingStatus: string; id: string };

export function UpdateBookingStatus({ bookingStatus, id }: propstype) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingStatus: "",
    },
  });

  useEffect(() => {
    if (bookingStatus) {
      form.setValue("bookingStatus", bookingStatus);
    }
  }, [bookingStatus, form]);

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.put("/api/booking", {
        id,
        bookingStatus: values.bookingStatus,
      });
      if (res.data.success) {
        console.log("refreshing");
        toast({
          title: "success",
          description: "Booking status updated successfully",
        });
        router.refresh();
      }
      if (!res.data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.data.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update booking status, try again",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn("text-sm w-full text-white duration-500", {
            "bg-yellow-500 hover:bg-yellow-600": bookingStatus === "pending",
            "bg-blue-500 hover:bg-blue-700": bookingStatus === "confirmed",
            "bg-red-500 hover:bg-red-700": bookingStatus === "cancelled",
            "bg-green-500 hover:bg-green-700": bookingStatus === "completed",
          })}
        >
          {bookingStatus}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Update Booking Status</DialogTitle>
              <DialogDescription>
                Change the booking status here. Select the status you want and
                click &apos;Save Changes&apos;
              </DialogDescription>
            </DialogHeader>

            <CustomForm
              FieldType={FormFieldTypes.SWITCH2}
              control={form.control}
              name="bookingStatus"
              title="select status"
              value={["pending", "confirmed", "cancelled", "completed"]}
            />

            <DialogFooter>
              <Button
                type="submit"
                className="bg-primary2 hover:bg-[#0a2370] duration-700"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
