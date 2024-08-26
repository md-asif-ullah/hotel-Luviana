import Image from "next/image";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import Link from "next/link";
import Header from "../Header";
import SecondaryButton from "../SecondaryButton";

const WelcomeSection = () => {
  return (
    <section className="min-h-screen h-full bg-white w-full py-20 px-5 md:px-14 lg:grid lg:grid-cols-2">
      <div className="relative">
        <Image
          src="/assets/home-images/welcome-1-902x1024.jpg"
          alt="hotel-image"
          width={500}
          height={500}
          className="w-44 md:w-96 relative lg:w-[290px] xl:w-[330px]"
        />
        <Image
          src="/assets/home-images/welcome-2-1024x705.jpg"
          alt="hotel-image"
          width={500}
          height={500}
          className="w-44 md:w-96 absolute top-28 left-24 md:left-[210px] md:top-56 lg:w-[290px] lg:top-48 lg:left-36 xl:w-[330px] xl:top-48 xl:left-44"
        />
      </div>
      <div className="mt-32 lg:mt-0 ml-4">
        <Header
          title="Welcome to Luviana Hotel Resort"
          header="RAISING COMFORT TO THE HIGHEST LEVEL"
        />
        <div className="mt-10 ml-8">
          <p className="text-[#7c7d7d] md:ml-5">
            The Hotel Luviana is the right choice for visitors who are searching
            for a combination of charm and a convenient position from where to
            explore surroundings.
            <br />
            <br />
            The rooms are arranged on the first, second and third floors. On the
            top floor, there is also a charming terrace or solarium available
            for the use of guests, from where you can enjoy the view.
          </p>
          <Link href="/about-luviana">
            <SecondaryButton text="Read More" className="mt-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
