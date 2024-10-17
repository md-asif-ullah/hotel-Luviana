import LoginFrom from "@/components/forms/LoginFrom";
import InfomationSection from "@/components/InfomationSection";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login to Hotel Luviana",
};

function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-4 md:p-8 rounded-lg shadow-lg">
        <InfomationSection
          title="Login"
          description="welcome back, please login to your account."
        />
        <LoginFrom />

        <p className="dark:text-white text-black mt-3 text-sm">
          don&apos;t have an account?
          <Link href="/register" className="text-[#1f4ace] ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
