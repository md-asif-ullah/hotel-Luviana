import MainHeader from "@/components/MainHeader";
import Image from "next/image";

export const metadata = {
  title: "Luviana Restaurant | Our Gallery",
};

function Gallery() {
  const images = [
    { src: "/assets/gallery-images/about-rooms-1-692x1024.jpg" },
    { src: "/assets/gallery-images/about-rooms-2-1024x692.jpg" },
    { src: "/assets/gallery-images/about-rooms-6-691x1024.jpg" },
    { src: "/assets/gallery-images/amenities-1024x422.jpg" },
    { src: "/assets/gallery-images/blog-3-1024x719.jpg" },
    { src: "/assets/gallery-images/blog-6-1024x719.jpg" },
    { src: "/assets/gallery-images/gallery-2-1-1024x1024.jpg" },
    { src: "/assets/gallery-images/gallery-3-1-1024x1024.jpg" },
    { src: "/assets/gallery-images/gallery-4-1-1024x1024.jpg" },
    { src: "/assets/gallery-images/gallery-5-1-1024x1024.jpg" },
    { src: "/assets/gallery-images/gallery-6-1-1024x1024.jpg" },
    { src: "/assets/gallery-images/gallery-7-1024x1024.jpg" },
    { src: "/assets/gallery-images/gallery-8-1024x1024.jpg" },
    { src: "/assets/gallery-images/gallery-9-1024x1024.jpg" },
    { src: "/assets/gallery-images/gallery-2560x989.jpg" },
    { src: "/assets/gallery-images/italian-kitchen-1024x1024.jpg" },
    { src: "/assets/gallery-images/single-room-2-1024x683.jpg" },
    { src: "/assets/gallery-images/single-room-3-1-1024x683.jpg" },
    { src: "/assets/gallery-images/single-room-4-1-1024x682.jpg" },
    { src: "/assets/gallery-images/welcome-2-1024x705.jpg" },
  ];

  return (
    <main className="bg-white min-h-screen h-full py-10 md:py-20">
      <MainHeader
        title="Our Gallery"
        description="We have gathered spectacular pictures of our hotel and location showcase pure beauty of nature and perfected style & design of our accommodations to inspire you."
      />

      <section className="grid md:grid-cols-2 mx-5 md:mx-10 xl:mx-20 gap-5 md:gap-10 xl:gap-14 mt-10 md:mt-20">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            width={1000}
            height={1000}
            alt={`gallery-image ${index}`}
            className="object-cover w-full h-[189px] lg:h-[300px] xl:h-[500px]"
          />
        ))}
      </section>
    </main>
  );
}

export default Gallery;
