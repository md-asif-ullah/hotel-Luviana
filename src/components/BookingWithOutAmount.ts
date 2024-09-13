import { IBookingType } from "@/types";
import axios from "axios";

export interface BookingPropsTypes {
  newFormData: IBookingType;
  form: any;
  toast: any;
  setLoading: (loading: boolean) => void;
}

async function BookingWithOutAmount({
  newFormData,
  form,
  toast,
  setLoading,
}: BookingPropsTypes) {
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

export default BookingWithOutAmount;
