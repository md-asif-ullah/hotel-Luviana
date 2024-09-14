import getStripe from "@/lib/get-stripejs";
import { BookingPropsTypes } from "@/types";
import axios from "axios";

const PaymentSection = async ({
  newFormData,
  form,
  toast,
  setLoading,
}: BookingPropsTypes) => {
  try {
    setLoading(true);
    const stripe = await getStripe();

    const res = await axios.post("/api/create-checkout-session", {
      data: newFormData,
    });

    const session = res.data.payload;

    if (stripe && session) {
      form.reset();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        toast({
          variant: "destructive",
          title: "error",
          description: result.error.message,
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    toast({
      variant: "destructive",
      title: "error",
      description: "something went wrong , please try again",
    });
  } finally {
    setLoading(false);
  }
};
export default PaymentSection;
