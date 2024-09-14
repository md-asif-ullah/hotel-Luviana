"use client";

import SecondaryButton from "@/components/SecondaryButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const Success = () => {
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const { toast } = useToast();

  const session_id = params.get("session_id");

  useEffect(() => {
    if (session_id) {
      const updatePaymentStatus = async () => {
        try {
          await axios.post("/api/confirm-payment", {
            sessionId: session_id,
          });
        } catch (err: any) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An error occurred while updating payment status.",
          });
        } finally {
          setLoading(false);
        }
      };

      updatePaymentStatus();
    }
  }, [session_id, toast]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-[#0a2370] mb-6">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-700 mb-2">
        Thank you for your purchase. Your payment was processed successfully.
      </p>
      <p className="text-base text-gray-500 mb-8">
        You will receive a confirmation email shortly with the transaction
        details.
      </p>
      <Link href="/">
        <SecondaryButton text="Back to Home" disabled={loading} />
      </Link>
    </div>
  );
};

export default Success;
