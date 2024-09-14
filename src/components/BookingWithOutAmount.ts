import { BookingPropsTypes } from "@/types";
import axios from "axios";

async function BookingWithOutAmount({
  newFormData,
  form,
  toast,
  setLoading,
  router,
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
    router.push("/rooms");
  }
}

export default BookingWithOutAmount;
