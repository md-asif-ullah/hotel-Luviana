import Image from "next/image";
import Header from "../Header";
import SecondaryButton from "../SecondaryButton";

function GallerySection() {
  const ImageSrc = [
    "gallery-2-1024x1005.jpg",
    "single-room-2-1024x683.jpg",
    "welcome-1-1-1024x1024.jpg",
    "welcome-2-1-1024x1024.jpg",
  ];

  return (
    <section className="min-h-screen h-full bg-white mx-4 md:mx-10 xl:mx-20 py-10">
      <header className="md:flex md:justify-between md:items-center">
        <div>
          <Header
            title="Welcome to our photo gallery"
            header="Photo Gallery of Our Hotel"
          />
        </div>
        {/* TODO: Add Link to view the gallery */}
        <div className="mt-10 text-right md:mt-0">
          <SecondaryButton text="View Gallery" />
        </div>
      </header>

      <div className="mt-20 grid gap-5 xl:gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {ImageSrc.map((src, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={`/assets/home-images/${src}`}
              alt="Gallery Image"
              width={500}
              height={500}
              className="h-[350px] object-cover w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default GallerySection;
