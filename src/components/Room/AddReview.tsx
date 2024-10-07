"use client";

import { Form } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm, { FormFieldTypes } from "../CustomForm";
import SecondaryButton from "../SecondaryButton";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { addReviewFormSchema } from "@/lib/zodValidation";
import { useRouter } from "next/navigation";

type AddReviewProps = {
  roomId: string;
  bookingId: string;
};

const AddReview = ({ roomId, bookingId }: AddReviewProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof addReviewFormSchema>>({
    resolver: zodResolver(addReviewFormSchema),
    defaultValues: {
      comfort_rating: 0,
      location_rating: 0,
      service_rating: 0,
      staff_rating: 0,
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addReviewFormSchema>) {
    const newReview = {
      ...values,
      userId: user?._id ?? "",
      roomId,
      bookingId,
    };

    try {
      const res = await axios.post(`/api/rooms/reviews`, newReview);
      if (res.data.success) {
        toast({
          title: "Success",
          description: "Review added successfully",
        });
      }

      router.push(`/`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message ?? "review not added",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-[#f58220] text-[#f58220] hover:bg-[#f58220] hover:text-white duration-500"
        >
          Write Review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write Review</DialogTitle>
          <DialogDescription>
            Please share your experience with us and help us improve our
            services.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-[500px]"
          >
            <div className="flex justify-between">
              <div className="w-[120px]">
                <CustomForm
                  label="Comfort"
                  FieldType={FormFieldTypes.RATING}
                  control={form.control}
                  name="comfort_rating"
                />
              </div>

              <div className="w-[120px]">
                <CustomForm
                  label="Location"
                  FieldType={FormFieldTypes.RATING}
                  control={form.control}
                  name="location_rating"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-[120px]">
                <CustomForm
                  label="Service"
                  FieldType={FormFieldTypes.RATING}
                  control={form.control}
                  name="service_rating"
                />
              </div>

              <div className="w-[120px]">
                <CustomForm
                  label="Staff"
                  FieldType={FormFieldTypes.RATING}
                  control={form.control}
                  name="staff_rating"
                />
              </div>
            </div>

            <CustomForm
              FieldType={FormFieldTypes.TextArea}
              control={form.control}
              name="comment"
              type="text"
              label="Comment"
              placeholder="Enter your Comment"
            />

            <DialogFooter>
              <SecondaryButton
                className="rounded-lg md:px-7 md:py-1 px-7 py-1"
                text="Submit"
                type="submit"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReview;
