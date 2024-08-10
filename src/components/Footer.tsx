import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLeafSharp } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import moment from "moment";

function Footer() {
  const years = moment().format("YYYY");

  const CustomersText = [
    "About Luviana",
    "Customer Care/Help",
    "Corporate Accounts",
    "Financial Information",
    "Terms & Conditions",
  ];

  const RecentNews = [
    {
      icon: <IoLeafSharp />,
      text: "Our Secret Island Boat Tour Is Just for You",
    },
    {
      icon: <IoLeafSharp />,
      text: "Chill and Escape in Our Natural Shelters",
    },
    {
      icon: <IoLeafSharp />,
      text: "September in Luviana Hotel",
    },
    {
      icon: <IoLeafSharp />,
      text: "Live Music Concerts at Luviana",
    },
  ];

  return (
    <footer className="bg-white px-4 lg:px-10 xl:px-20 h-full w-full">
      <div className="max-w-7xl grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 lg:gap-8 text-sm">
        <section className="space-y-5">
          <Image
            src="/assets/icons/logo-footer.svg"
            alt="Logo"
            width={200}
            height={200}
            className="w-[150px] h-[63px]"
          />
          <p className="text-[#64676f]">
            All hotels and vacation rental properties listed on this website are
            independently owned and operated. Accepted payment methods:
          </p>
          <Image
            src="/assets/shared-images/payments.png"
            alt="Logo"
            width={200}
            height={200}
            className="w-[183px] h-[17px]"
          />
        </section>
        <section className="">
          <h3 className="font-medium text-2xl">For Customers</h3>
          <div className="space-y-3 flex flex-col mt-7">
            {CustomersText.map((text, index) => (
              <Link
                key={index}
                href="/"
                className="hover:text-primary2 duration-500 hover:underline text-[#64676f]"
              >
                {text}
              </Link>
            ))}
          </div>
        </section>
        <section className="">
          <h3 className="font-medium text-2xl">Recent News</h3>
          <div className="space-y-4 mt-7">
            {RecentNews.map((news, index) => (
              <div key={index} className="flex space-x-2">
                <i className="text-primary2 text-xl">{news.icon}</i>
                <Link
                  className="hover:text-primary2 duration-500 hover:underline text-[#64676f]"
                  href="/"
                >
                  {news.text}
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-7">
          <h3 className="font-medium text-2xl">Contact Us</h3>
          <p className="text-[#64676f]">
            3015 Grand Ave, Coconut Grove, Merrick Way, FL 12345
          </p>
          <div className="flex items-center space-x-2 hover:underline cursor-pointer text-[#64676f]">
            <TfiEmail />
            <p>hello@luviana.com</p>
          </div>
          <div className="flex items-center space-x-2 hover:underline cursor-pointer text-[#64676f]">
            <FaPhoneAlt />
            <p>1.954.456.6789</p>
          </div>
        </section>
      </div>

      {/* copyright worning */}

      <section className="block md:text-lg text-base text-[#667282] dark:text-[#7889a0] text-center py-10">
        Copyright © {years} . All Rights Reserved.
      </section>
    </footer>
  );
}

export default Footer;
