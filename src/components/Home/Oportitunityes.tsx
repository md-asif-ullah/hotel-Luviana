import Image from "next/image";
import {
  FaCocktail,
  FaMicrophone,
  FaSpa,
  FaSwimmingPool,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { FaPersonSwimming } from "react-icons/fa6";
import { IoIosBoat } from "react-icons/io";
import { MdOutlineScubaDiving } from "react-icons/md";

function Oportitunityes() {
  return (
    <section className="min-h-screen h-full bg-white flex md:justify-center lg:justify-end md:relative pb-10">
      <Image
        src="/assets/home-images/amenities-new.jpg"
        alt="Amenities"
        width={1920}
        height={800}
        className="hidden md:block object-cover mt-12 mb-20 md:h-[390px] lg:h-[460px]"
      />
      <div className="bg-[#3f9cc1] text-white px-4 md:px-16 py-14 lg:py-24 mb-10 md:absolute md:w-[600px] lg:mr-14 xl:mr-20 mx-4 md:mx-0">
        <h3 className="text-4xl font-semibold">Our Amenities</h3>
        <p className="mt-8 text-lg">
          The hotel is arranged on three floors without a lift. On the ground
          floor, apart from the reception, there is a comfortable lounge where
          you can sit and drink tea.
        </p>
        <div className="mt-10 md:flex md:justify-between text-xl">
          <div>
            <div className="flex items-center mb-4">
              <FaSwimmingPool />
              <h4 className="ml-3">Swimming pool</h4>
            </div>
            <div className="flex items-center mb-4">
              <FaSpa />
              <h4 className="ml-3">Spa & massage</h4>
            </div>
            <div className="flex items-center mb-4">
              <FaPersonSwimming />
              <h4 className="ml-3">Surfing lessons</h4>
            </div>
            <div className="flex items-center mb-4">
              <MdOutlineScubaDiving />
              <h4 className="ml-3">Diving & snorkelling</h4>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <FaCocktail />
              <h4 className="ml-3">Bar & restaurant</h4>
            </div>
            <div className="flex items-center mb-4">
              <IoIosBoat />
              <h4 className="ml-3">Boat tours</h4>
            </div>
            <div className="flex items-center mb-4">
              <FaMicrophone />
              <h4 className="ml-3">Conference room</h4>
            </div>
            <div className="flex items-center mb-4">
              <FaUmbrellaBeach />
              <h4 className="ml-3">Private Beach</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Oportitunityes;
