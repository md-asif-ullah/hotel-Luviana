"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Link from "next/link";
import PrimaryButton from "../PrimaryButton";

type SlideInfo = {
  imgUrl: string;
  header: string;
  title: string;
};

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliders: SlideInfo[] = [
    {
      imgUrl: "/assets/home-images/slide-1-main.jpg",
      header: "Hello.Salut.Hola",
      title:
        "Our Hotels & Resorts stylish, modern, forward-thinking global leader of hospitality and we help make traveling easier with our smart design, innovative restaurant concept, unique activities, nature, and authentic hospitality.",
    },
    {
      imgUrl: "/assets/home-images/slide-2-new-2560x1268.jpg",
      header: "Rooms & Suites",
      title:
        "Our hotels offer a wide range of rooms for you. Standard rooms, deluxe rooms, or two-bedroom apartments, at our hotels you will for sure find what suits you best. All apartments have modern design, all needed amenities, and perfect views from windows.",
    },
    {
      imgUrl: "/assets/home-images/slide-3.jpg",
      header: "Restaurant",
      title:
        "At our restaurant, you will taste the most exquisite, delicious, and mouth-watering dishes prepared especially for you by our best chefs. Every desire you have can be fulfilled by our cooks who will surprise you with a high level of professionalism.",
    },
    {
      imgUrl: "/assets/home-images/Slide-4-2560x1268.jpg",
      header: "Activities",
      title:
        "We provide a bunch of different offers that may be of interest to you. Check them out and choose the one that suits you best. We are sure that you will find something that will make your stay at our hotel even more enjoyable.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [sliders.length]);

  const slideInfo = sliders[currentIndex];

  return (
    <section
      className="h-full min-h-screen"
      style={{
        backgroundImage: `url(${slideInfo.imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <Navbar />
        <div className="flex justify-between lg:py-14 py-10 xl:px-28 lg:px-16 md:px-10 px-4">
          <div className="text-white md:mt-20 mt-10">
            <h1 className="font-bold lg:text-7xl md:text-5xl text-4xl">
              {slideInfo.header}
            </h1>
            <div className="md:pl-10 pl-5 lg:mt-10 mt-5 ">
              <p className="lg:max-w-[600px] md:max-w-[450px] lg:text-lg">
                {slideInfo.title}
              </p>
              <Link href="/about">
                <PrimaryButton text="MORE INFO" style="mt-6" />
              </Link>
            </div>
          </div>
          <div className="hidden md:block lg:space-y-10 space-y-6">
            {sliders.map((slider, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer${
                  currentIndex === index ? "border-2 border-white" : ""
                } rounded-md`}
              >
                <Image
                  src={slider.imgUrl || ""}
                  alt="Thumbnail Image"
                  loading="lazy"
                  width={500}
                  height={500}
                  className="w-40 h-20"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
