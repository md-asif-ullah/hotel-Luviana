"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Swiper as swiperType } from "swiper/types";
import { RoomTypes } from "@/types";
import { useState } from "react";

function SwiperImageSlider({ room }: { room: RoomTypes }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<swiperType | null>(null);

  return (
    <section className="border border-[#e2e8f0] p-5 ">
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={cn("mySwiper2", "")}
      >
        {room.images.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={room.roomName}
              priority
              width={1000}
              height={1000}
              className="md:w-full md:h-[430px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={cn("mySwiper", "mt-5")}
      >
        {room.images.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={room.roomName}
              width={200}
              height={200}
              className="md:w-full md:h-[90px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default SwiperImageSlider;
