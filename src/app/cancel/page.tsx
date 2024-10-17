import SecondaryButton from "@/components/SecondaryButton";
import Link from "next/link";

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#0a2370] mb-4 md:mb-6">
        Payment Successful!
      </h1>
      <p className="text-base md:text-lg text-gray-700 mb-2 text-center">
        Thank you for your purchase. Your payment was processed successfully.
      </p>
      <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8 text-center">
        You will receive a confirmation email shortly with the transaction
        details.
      </p>
      <Link href="/">
        <SecondaryButton text="Back to Home" />
      </Link>
    </div>
  );
};

export default Cancel;
