"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Swiper as swiperType } from "swiper/types";
import { IoIosStar, IoMdBookmark } from "react-icons/io";
import { IoBedOutline, IoMan } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { FaChild, FaEye } from "react-icons/fa";
import PageLoading from "@/components/PageLoading";
import { ApiDataTypes } from "@/types";

function RoomDetails() {
  const [thumbsSwiper, setThumbsSwiper] = useState<swiperType | null>(null);
  const [room, setRoom] = useState<ApiDataTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { id } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/rooms/${id}`);
        const data = await res.json();

        if (data.success) {
          setRoom(data.payload);
        }
        if (!data.success) {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch room data");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading || error) {
    return <PageLoading isLoading={loading} error={error} />;
  }

  if (!room) {
    return <div className="text-center text-red-500">Room not found</div>;
  }

  return (
    <div className="py-10 bg-white w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 px-4">
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
                  className="md:w-full md:h-[130px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="border border-[#e2e8f0] p-5 ">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            {room.roomName}
          </h1>
          <p className="text-gray-600 text-sm mt-1">{room.description}</p>
          <div className="space-y-4 text-sm text-gray-700 pt-8">
            {/* Adults */}
            <div className="flex space-x-4">
              <i className="text-primary2 text-xl">
                <IoMan />
              </i>
              <span>Adults: {room.adults}</span>
            </div>

            {/* Children */}
            <div className="flex space-x-4">
              <i className="text-primary2 text-xl">
                <FaChild />
              </i>
              <span>Children: {room.children ? room.children : 0}</span>
            </div>

            {/* View */}
            <div className="flex space-x-4">
              <i className="text-primary2 text-xl">
                <FaEye />
              </i>
              <span>View: {room.view}</span>
            </div>

            {/* Size */}
            <div className="flex space-x-4">
              <i className="text-primary2 text-xl">
                <SlSizeFullscreen />
              </i>
              <span>Size: {room.size}m²</span>
            </div>

            {/* Bed Type */}
            <div className="flex space-x-4">
              <i className="text-primary2 text-xl">
                <IoBedOutline />
              </i>
              <span>Bed Type: {room.bedType}</span>
            </div>

            {/* Categories */}
            <div className="flex space-x-4">
              <i className="text-primary2 text-xl">
                <IoMdBookmark />
              </i>
              <span>Categories: {room.categories}</span>
            </div>

            {/* Amenities */}
            <div className="flex space-x-4">
              <i className="text-primary2 text-xl">
                <IoIosStar />
              </i>
              <div>Amenities: {room.amenities}</div>
            </div>
            <p className="text-2xl md:text-3xl">
              ${room.price}
              <span className="text-xs md:text-base text-gray-600">
                / per night
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RoomDetails;
