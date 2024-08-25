"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SecondaryButton from "@/components/SecondaryButton";
import axios from "axios";

function Verify() {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();
  const { toast } = useToast();
  const router = useRouter();

  const newData = {
    id,
    verificationCode: value,
  };

  const handleOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/verifyUser", newData);

      if (res.data.success) {
        toast({
          title: "Account verified",
          description: "You can now login to your account",
        });
        router.push("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

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
        <form
          onSubmit={handleOtp}
          className="flex flex-col items-center space-y-4"
        >
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
            disabled={loading}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <SecondaryButton
            text="Submit"
            type="submit"
            loading={loading}
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
}

export default Verify;
