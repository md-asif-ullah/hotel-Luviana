import { ApiDataTypes } from "@/types";
import { FaEye } from "react-icons/fa";
import { FaChild } from "react-icons/fa6";
import { IoIosStar, IoMdBookmark } from "react-icons/io";
import { IoBedOutline, IoMan } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";

function RoomDetails({ data }: { data: ApiDataTypes | null }) {
  const { adults, children, amenities, view, size, bedType, categories } =
    data || {};

  return (
    <section className="bg-white rounded-lg mt-20">
      <h2 className="text-xl font-semibold mb-4">Details</h2>
      <table className="w-full text-left border border-[#ededed]">
        <tbody>
          <tr className="border-b border-[#ededed]">
            <td className="md:p-4 p-2 flex items-center space-x-2 border-r border-[#ededed]">
              <i className="text-primary2 text-lg">
                <IoMan />
              </i>
              <span>Adults</span>
            </td>
            <td className="md:p-4 p-2">{adults}</td>
          </tr>
          <tr className="border-b border-[#ededed]">
            <td className="md:p-4 p-2 flex items-center space-x-2 border-r border-[#ededed]">
              <i className="text-primary2 text-lg">
                <FaChild />
              </i>
              <span>Children</span>
            </td>
            <td className="md:p-4 p-2">{children}</td>
          </tr>
          <tr className="border-b border-[#ededed]">
            <td className="md:p-4 p-2 flex items-center space-x-2">
              <i className="text-primary2 text-lg">
                <FaEye />
              </i>
              <span>View</span>
            </td>
            <td className="md:p-4 p-2 border-l border-[#ededed]">{view}</td>
          </tr>
          <tr className="border-b border-[#ededed]">
            <td className="md:p-4 p-2 flex items-center space-x-2 border-r border-[#ededed]">
              <i className="text-primary2 text-lg">
                <SlSizeFullscreen />
              </i>
              <span>Size</span>
            </td>
            <td className="md:p-4 p-2">{size}m²</td>
          </tr>
          <tr className="border-b border-[#ededed]">
            <td className="md:p-4 p-2 flex items-center space-x-2 border-r border-[#ededed]">
              <i className="text-primary2 text-lg">
                <IoBedOutline />
              </i>
              <span>Bed Type</span>
            </td>
            <td className="md:p-4 p-2">{bedType}</td>
          </tr>
          <tr>
            <td className="md:p-4 p-2 flex items-center space-x-2 border-r border-[#ededed]">
              <i className="text-primary2 text-lg">
                <IoMdBookmark />
              </i>
              <span>Categories</span>
            </td>
            <td className="md:p-4 p-2">{categories}</td>
          </tr>
          <tr className="border-b border-[#ededed]">
            <td className="md:p-4 p-2 flex items-center space-x-2">
              <i className="text-primary2 text-lg">
                <IoIosStar />
              </i>
              <span>Amenities</span>
            </td>
            <td className="md:p-4 p-2 border-l border-[#ededed]">
              {amenities}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default RoomDetails;
