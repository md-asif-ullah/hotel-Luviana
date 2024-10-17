"use client";

import ErrorPage from "@/components/ErrorPage";
import Header from "@/components/Header";
import MainHeader from "@/components/MainHeader";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import SlideImage from "@/components/SlideImage";
import { ApiDataTypes, IPaginationTypes, RoomTypes } from "@/types";
import Link from "next/link";
import { FaChild, FaEye } from "react-icons/fa";
import { IoIosStar, IoMdBookmark } from "react-icons/io";
import { IoBedOutline, IoMan } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PageLoadingAnimation from "@/components/PageLoadingAnimation";
import { Button } from "@/components/ui/button";

interface IRoomResponseTypes {
  rooms: RoomTypes[];
  pagination: IPaginationTypes;
}

function Rooms() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IRoomResponseTypes | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/rooms?page=${page}&limit=10`);

      if (res.data.success) {
        const newRooms = res.data.payload.rooms;
        setData((prevData) => {
          const existingRooms = prevData?.rooms || [];
          const mergedRooms: RoomTypes[] = [
            ...existingRooms,
            ...newRooms.filter(
              (newRoom: RoomTypes) =>
                !existingRooms.some(
                  (existingRoom: RoomTypes) => existingRoom._id === newRoom._id
                )
            ),
          ];
          return {
            rooms: mergedRooms,
            pagination: res.data.payload.pagination,
          };
        });
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      getCustomers();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [page, getCustomers]);

  const handleLoadMore = () => {
    if (data?.pagination?.nextPage) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading && page === 1) {
    return <PageLoadingAnimation />;
  }

  if (!data && error) {
    return <ErrorPage text={error} />;
  }
  return (
    <>
      <div className="pt-10">
        {data?.rooms?.map((room: ApiDataTypes) => (
          <div
            key={room._id}
            className="h-full lg:grid lg:grid-cols-2 lg:gap-16 mt-16"
          >
            <SlideImage images={room?.images} />

            <div className="pt-14 lg:pt-0">
              <Header
                header={room.roomName}
                title={room.description}
                headerStyle="text-2xl font-semibold text-gray-800"
                titleStyle="text-base text-gray-500"
              />

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

                <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5">
                  <Link href={`rooms/${room._id}`}>
                    <SecondaryButton text="Book Room" />
                  </Link>
                  <Link href={`rooms/${room._id}`}>
                    <PrimaryButton
                      text="View Details"
                      style="text-[#5f6060] border-[#dadada] hover:bg-[#0a2370] hover:text-white"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data?.pagination?.nextPage && (
        <div className="flex justify-center items-center mt-20">
          <Button
            className="bg-[#4a6fdd] hover:bg-[#0a2370] duration-500 md:w-1/4 md:py-3"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
}

export default Rooms;
