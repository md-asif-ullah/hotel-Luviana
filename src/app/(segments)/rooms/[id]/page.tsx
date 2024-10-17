import MainHeader from "@/components/MainHeader";
import Image from "next/image";
import RoomDetails from "@/components/Room/RoomDetails";
import BookingSection from "@/components/Room/BookingSection";
import ShowReviews from "@/components/Room/ShowReviews";
import ErrorPage from "@/components/ErrorPage";
import { Suspense } from "react";
import GetRoom from "@/components/Room/GetRoom";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await GetRoom({ params });

  return {
    title: data?.roomDetails.roomName,
  };
}

async function Room({ params }: { params: { id: string } }) {
  const data = await GetRoom({ params });

  if (!data) {
    return <ErrorPage text="Error fetching data" />;
  }

  const { images, roomName, description } = data.roomDetails;

  return (
    <main className="w-full min-h-screen bg-white h-full px-5 md:px-10 xl:px-20 pb-10 md:pb-20">
      <div className="mt-10 md:mt-28">
        <MainHeader title={roomName} />
      </div>

      {images[0] && (
        <Image
          src={images[0]}
          alt={`${roomName} image`}
          priority
          width={1200}
          height={1000}
          className="object-cover w-full h-[180px] md:h-[400px] lg:h-[600px] mt-16 md:mt-20"
        />
      )}

      <section className="lg:grid lg:grid-cols-5 lg:gap-14 xl:gap-20 relative">
        <div className="col-span-3">
          <p className="mt-10 text-secondary2">{description}</p>

          {/* room all images */}

          <div className=" mt-10">
            <div className="space-y-7">
              {[0].map((rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-9 gap-7">
                  {images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`${roomName} images` || "Image"}
                      width={500}
                      height={600}
                      className={`${
                        index === 0 ||
                        index === 3 ||
                        index === 4 ||
                        index === 7 ||
                        index === 8
                          ? "col-span-4"
                          : "col-span-5"
                      } w-full h-[120px] sm:h-[150px] md:h-[300px] object-cover shadow-2xl`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <RoomDetails data={data?.roomDetails} />
        </div>
        <section className="col-span-2 mt-20">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="sticky top-10">
              <BookingSection data={data?.roomDetails} />
            </div>
          </Suspense>
        </section>
      </section>

      {/* show room reviews */}
      {data?.reviews.length > 0 ? (
        <ShowReviews reviews={data?.reviews} />
      ) : (
        <p className="text-center text-lg text-gray-500 mt-10">
          No reviews yet
        </p>
      )}
    </main>
  );
}

export default Room;
