"use client";

import Loading from "@/components/Loading";
import MainHeader from "@/components/MainHeader";
import { ApiDataTypes } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DatePickerSection } from "@/components/Room/DatePickerSection";
import RoomDetails from "@/components/Room/RoomDetails";

function Room() {
  const [data, setData] = useState<ApiDataTypes | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchRoom() {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        const data = await res.json();
        if (data.success) {
          setData(data.payload);
          setLoading(false);
        }
      } catch (error: any) {
        console.log(error.message);
        setError("room dose not exist with this id");
        setLoading(false);
      }
    }
    fetchRoom();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <main className="w-full min-h-screen bg-white h-full px-5 md:px-10 xl:px-20 pb-10 md:pb-20">
      {error && <p>{error}</p>}
      <div className="mt-10 md:mt-28">
        <MainHeader title={data?.name} />
      </div>

      {data?.images[0] && (
        <Image
          src={data?.images[0]}
          alt={data?.name}
          priority
          width={1200}
          height={1000}
          className="object-cover w-full h-[180px] md:h-[400px] lg:h-[600px] mt-16 md:mt-20"
        />
      )}

      <section className="lg:grid lg:grid-cols-5 lg:gap-14 xl:gap-20 relative">
        <div className="col-span-3">
          <p className="mt-10 text-secondary2">{data?.description}</p>

          {/* room all images */}

          <div className=" mt-10">
            <div className="space-y-7">
              {[0].map((rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-9 gap-7">
                  {data?.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={data?.name || "Image"}
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

          <RoomDetails data={data} />
        </div>
        <section className="col-span-2 mt-20">
          <div className="sticky top-10">
            <DatePickerSection data={data} />
          </div>
        </section>
      </section>
    </main>
  );
}

export default Room;
