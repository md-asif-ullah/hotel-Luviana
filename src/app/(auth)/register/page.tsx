import RegisterForm from "@/components/forms/RegisterForm";
import InfomationSection from "@/components/InfomationSection";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register to Hotel Luviana",
};

function Register() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-4 md:p-8 rounded-lg shadow-lg">
        <InfomationSection
          title="Register"
          description="Please enter your details to register."
        />
        <section className="mt-8">
          <RegisterForm />
        </section>
        <p className="dark:text-white text-black mt-3 text-sm">
          Already have an account?
          <Link href="/login" className="text-[#1f4ace] ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
