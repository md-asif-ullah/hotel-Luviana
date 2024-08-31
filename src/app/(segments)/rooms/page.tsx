import GetRooms from "@/components/GetRooms";
import Header from "@/components/Header";
import MainHeader from "@/components/MainHeader";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import SlideImage from "@/components/SlideImage";
import { ApiDataTypes } from "@/types";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { IoIosStar, IoMdBookmark } from "react-icons/io";
import { IoBedOutline, IoMan } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";

async function Rooms() {
  const rooms = await GetRooms();

  return (
    <main className="min-h-screen w-full h-full bg-white">
      <section className="mt-28 mb-20 px-4 md:px-10 xl:px-20 lg:px-12">
        <MainHeader
          title="Rooms & Suites"
          description="The hotel is arranged on three floors, without a lift. On the ground floor, apart from the reception, there is a comfortable lounge where you can sit and drink tea."
        />

        {/* handle error fetching data */}

        {rooms === null && (
          <div className="flex justify-center items-center h-screen">
            <p className="text-2xl text-red-500">Error fetching data</p>
          </div>
        )}
        <div className="pt-10">
          {rooms?.payload?.map((room: ApiDataTypes) => (
            <div
              key={room._id}
              className="h-full lg:grid lg:grid-cols-2 lg:gap-16 mt-16"
            >
              <SlideImage images={room?.images} />

              <div className="pt-14 lg:pt-0">
                <Header
                  header={room.name}
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
      </section>
    </main>
  );
}

export default Rooms;
