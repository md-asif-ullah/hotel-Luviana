"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function Verify() {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { email } = useParams<{ email: string }>();
  const { toast } = useToast();
  const router = useRouter();

  const newData = {
    email: decodeURIComponent(email),
    verificationCode: value,
  };

  const handleOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/verifyUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!res.ok) {
        throw new Error("verification failed");
      }
      const data = await res.json();

      if (data.success) {
        toast({
          title: "Account verified",
          description: "You can now login to your account",
        });
        router.push("/");
      }
      if (!data.success) {
        toast({
          title: "Error",
          description: data.message || "verification failed",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "verification failed",
      });
    } finally {
      setValue("");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (value.length === 6) {
      handleOtp();
    }
  }, [value]);

  return (
    <div className="h-screen bg-white flex justify-center items-center px-4">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Verify your account
          </h1>
          <p className="text-gray-500 md:w-[500px]">
            We have sent you a verification code to your email address. Please
            enter the code below
          </p>
        </div>

        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
          disabled={loading}
          className="flex flex-col items-center space-y-4 "
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="border-red-900" />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
}

export default Verify;
