import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Bitter } from "next/font/google";

const fontBitter = Bitter({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-bitter",
});

const AccordionInfo = [
  {
    title: "Italian kitchen",
    content:
      "With our Italian dishes cooked by professional chefs you will be feeling as if you are at authentic Italian restaurant. Olive oil, vines and wheat bread are the keys of Italian kitchen.",
  },
  {
    title: "Mexican kitchen",
    content:
      "Genuine Mexican prepared at out restaurant is delicious, fresh and vibrant. Main feature here is chilly – both dried and fresh. Also key ingredients of Mexican kitchen are beans and corn.",
  },
  {
    title: "Japanise Kitchen",
    content:
      "You can taste some extraordinary dishes which became popular in the whole world. Any sushi you want you will get at out restaurant. We have an authentic cook from Japan to meet your desires.",
  },
  {
    title: "Indian Kitchen",
    content:
      "Indian food is known for its spiciness. The most frequently used are chilly pepper, black mustard seed, cumin, tumeric, ginger etc. We will transfer you to India via our dishes.",
  },
];

function AboutRestaurantSection() {
  return (
    <section className="min-h-screen h-full bg-white px-4 lg:px-10 xl:px-20 md:pt-5 pb-10">
      <div className="md:grid md:grid-cols-2 md:gap-5 lg:gap-10 xl:gap-20">
        <Image
          src="/assets/home-images/restaurant-1024x982.jpg"
          alt="Restaurant"
          width={600}
          height={600}
        />
        <div>
          <h3 className={`text-3xl mt-7 md:mt-0 ${fontBitter.className}`}>
            Our Restaurant
          </h3>
          <p className="text-base mt-5 text-[#5f6060]">
            The buffet breakfast is served in the lounge on the ground floor and
            also outside on our little patio.
          </p>
          <Accordion className="mt-5" type="single" collapsible>
            {AccordionInfo.map((info, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger>{info.title}</AccordionTrigger>
                <AccordionContent className="text-[#5f6060] pl-4">
                  {info.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default AboutRestaurantSection;
