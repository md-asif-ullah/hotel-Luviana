import { IoIosStar, IoMdBookmark } from "react-icons/io";
import { IoBedOutline, IoMan } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { FaChild, FaEye } from "react-icons/fa";
import GetRoom from "@/components/Room/GetRoom";
import SwiperImageSlider from "@/components/SwiperImageSlider";

async function RoomDetails({ params }: { params: { id: string } }) {
  const room = await GetRoom({ params });

  if (!room) {
    return <div className="text-center text-red-500">Room not found</div>;
  }

  const {
    roomName,
    description,
    adults,
    children,
    view,
    size,
    bedType,
    categories,
    amenities,
    price,
  } = room.roomDetails;

  return (
    <div className="py-10 bg-white w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 px-4 xl:px-7">
        {/* Room Image */}
        <SwiperImageSlider room={room.roomDetails} />

        {/* Room Details Section */}
        <section className="border border-gray-200 p-6 bg-gray-50 rounded-md shadow-lg">
          <h1 className="text-3xl xl:text-4xl font-bold text-gray-800">
            {roomName}
          </h1>
          <p className="text-gray-600 text-sm xl:text-base mt-2">
            {description}
          </p>

          <div className="space-y-6 text-sm xl:text-base text-gray-700 pt-6 xl:pt-10">
            {/* Adults */}
            <div className="flex items-center space-x-4">
              <i className="text-primary2 text-xl xl:text-2xl">
                <IoMan />
              </i>
              <span>Adults: {adults}</span>
            </div>

            {/* Children */}
            <div className="flex items-center space-x-4">
              <i className="text-primary2 text-xl xl:text-2xl">
                <FaChild />
              </i>
              <span>Children: {children ? children : 0}</span>
            </div>

            {/* View */}
            <div className="flex items-center space-x-4">
              <i className="text-primary2 text-xl xl:text-2xl">
                <FaEye />
              </i>
              <span>View: {view}</span>
            </div>

            {/* Size */}
            <div className="flex items-center space-x-4">
              <i className="text-primary2 text-xl xl:text-2xl">
                <SlSizeFullscreen />
              </i>
              <span>Size: {size}m²</span>
            </div>

            {/* Bed Type */}
            <div className="flex items-center space-x-4">
              <i className="text-primary2 text-xl xl:text-2xl">
                <IoBedOutline />
              </i>
              <span>Bed Type: {bedType}</span>
            </div>

            {/* Categories */}
            <div className="flex items-center space-x-4">
              <i className="text-primary2 text-xl xl:text-2xl">
                <IoMdBookmark />
              </i>
              <span>Categories: {categories}</span>
            </div>

            {/* Amenities */}
            <div className="flex items-center space-x-4">
              <i className="text-primary2 text-xl xl:text-2xl">
                <IoIosStar />
              </i>
              <div>Amenities: {amenities}</div>
            </div>

            {/* Price */}
            <p className="text-3xl xl:text-4xl font-bold">
              ${price}
              <span className="text-sm xl:text-lg text-gray-600">
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
