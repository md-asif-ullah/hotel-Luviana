import Image from "next/image";
import GetRooms from "../GetRooms";
import Header from "../Header";
import PrimaryButton from "../PrimaryButton";

async function RoomSection() {
  const data = await GetRooms();

  const firstthreeRooms = data?.payload?.slice(0, 3);

  return (
    <section className="min-h-screen h-full px-4 xl:px-20 md:px-10 bg-[#ffffff] pb-20">
      <header className="md:flex md:justify-between items-center">
        <div>
          <Header
            title="Rooms & Suites"
            header="RAISING COMFORT TO THE HIGHEST LEVEL"
          />
        </div>
        <div className="mt-10 text-end md:mt-0 md:text-balance">
          {/* TODO: add room link for see all rooms */}

          <PrimaryButton text="View All" />
        </div>
      </header>

      {/* TODO: add room link for see room details  */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 ">
        {firstthreeRooms?.map((room: any) => (
          <div
            key={room._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <Image
              src={room.images[0]}
              alt={room.name}
              width={400}
              height={400}
              className="object-cover w-full h-[300px]"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {room.name}
              </h3>
              <p className="text-gray-600 text-xl">
                ${room.price} /<span className="text-sm">per night</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RoomSection;
