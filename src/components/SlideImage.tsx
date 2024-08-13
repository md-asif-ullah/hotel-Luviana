import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function SlideImage({ images }: { images: Array<string> }) {
  if (images.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <Carousel className="w-full relative">
      <CarouselContent className="">
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              width={1000}
              height={700}
              className="object-cover lg:h-[510px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute top-1/2 right-20 left-20">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}

export default SlideImage;
