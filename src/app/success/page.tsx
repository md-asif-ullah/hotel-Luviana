import SecondaryButton from "@/components/SecondaryButton";
import Link from "next/link";

const Success = () => {
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
        <SecondaryButton text="Back to Home" />
      </Link>
    </div>
  );
};

export default Success;
