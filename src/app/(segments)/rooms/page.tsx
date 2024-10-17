import MainHeader from "@/components/MainHeader";
import Rooms from "@/components/Room/Rooms";

export const metadata = {
  title: "Rooms & Suites ! Hotel Luvina",
};

function RoomPage() {
  return (
    <main className="min-h-screen w-full h-full bg-white">
      <section className="mt-28 mb-20 px-4 md:px-10 xl:px-20 lg:px-12">
        <MainHeader
          title="Rooms & Suites"
          description="The hotel is arranged on three floors, without a lift. On the ground floor, apart from the reception, there is a comfortable lounge where you can sit and drink tea."
        />

        <Rooms />
      </section>
    </main>
  );
}

export default RoomPage;
