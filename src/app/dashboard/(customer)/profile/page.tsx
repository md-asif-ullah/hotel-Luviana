import InformationSection from "@/components/profile/InformationSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Hotel Luviana",
};

function Profile() {
  return (
    <div className="flex justify-center items-center h-full pt-10 pb-20 mx-5">
      <div className="space-y-8 w-full max-w-3xl">
        <InformationSection />
      </div>
    </div>
  );
}

export default Profile;
