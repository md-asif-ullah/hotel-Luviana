import Header from "@/components/Header";
import MainHeader from "@/components/MainHeader";
import Image from "next/image";
import { FaWifi } from "react-icons/fa";
import { MdFreeBreakfast, MdRoomService } from "react-icons/md";

interface Founder {
  name: string;
  position: string;
  src: string;
}

interface Services {
  title: string;
  description: string;
  icon: JSX.Element;
}

function AboutLuviana() {
  const founders: Founder[] = [
    {
      name: "Niamh Shea",
      position: "Co-founder and Chief Executive",
      src: "photo-1472099645785-5658abf4ff4e.jpeg",
    },
    {
      name: "Danien Jame",
      position: "Co-founder and Chief Executive",
      src: "team-1-1024x1024.jpg",
    },
    {
      name: "Ronald Hawkins",
      position: "Co-founder, Chairman",
      src: "team-2-1024x1024.jpg",
    },
    {
      name: "Denis Schultz",
      position: "Co-Founder, Chief Strategy Officer",
      src: "team-3-1024x1024.jpg",
    },
  ];

  const services: Services[] = [
    {
      title: "Breakfast",
      description:
        "Breakfast is served in the lounge or on the terrace. The delicious smell of coffee and freshly baked croissants will make your morning even more enjoyable.",
      icon: <MdFreeBreakfast />,
    },
    {
      title: "Free Wi-Fi",
      description:
        "Free Wi-Fi is available throughout the hotel. Stay connected with your loved ones and share your impressions of the day.",
      icon: <FaWifi />,
    },
    {
      title: "Room Service",
      description:
        "Room service is available 24 hours a day. Enjoy your favorite dishes and drinks in the comfort of your room.",
      icon: <MdRoomService />,
    },
  ];

  return (
    <div className="bg-white h-full min-h-screen py-10 md:py-24">
      <MainHeader
        title="About Luviana"
        description="The Hotel Luviana is the right choice for visitors who are searching for a combination of charm, peace, quiet and a convenient position from where to explore surroundings."
      />

      {/* welcome seciton */}

      <section className="mx-5 md:mx-10 xl:mx-20 mt-20">
        <div className="grid lg:grid-cols-2 gap-5 md:gap-10 xl:gap-20">
          <div>
            <Header
              header="RAISING COMFORT TO THE HIGHEST LEVEL"
              title="Welcome to Luviana Hotel"
            />

            <p className="mt-10 text-[#5f6060]">
              It is a small comfortable hotel. Our staff offers an attentive
              high-quality service and is always ready to offer any help to
              guests. The hotel is arranged on three floors. On the ground
              floor, apart from the reception, there is a comfortable lounge
              where you can sit and drink tea or just read. There is also a
              splendid terrace, where you can relax and immerse yourself into
              upcoming morning of a new wonderful day in the atmosphere of
              Venetian daily life, watch the city fuss & people who are
              gathering together and whose conversations fill all the streets
              and alleys. There is an amazing fusion of calm and tranquility at
              hotel with hectic outside.
            </p>
          </div>
          <Image
            src="/assets/about-images/aboutus01.jpg"
            alt="about image"
            width={700}
            height={400}
            className="w-full object-cover h-[200px] md:h-[400px] xl:h-[350px] mt-10 md:mt-0 rounded-lg"
          />
        </div>
      </section>

      {/* service section */}

      <section>
        <div className="mx-5 md:mx-10 xl:mx-20 mt-20">
          <Header header="OUR SERVICES" title="What We Offer" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-10 xl:gap-20 mt-10">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col items-center space-y-5"
              >
                <div className="p-3 text-2xl rounded-full bg-[#0a2370] text-white">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-[#5f6060]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms & Luxury Suites section */}

      <section className="mx-5 md:mx-10 xl:mx-20 mt-20">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-5 md:gap-10 xl:gap-20">
          <video controls>
            <source src="/videos/hotel_promo_video.mp4" type="video/mp4" />
          </video>
          <div>
            <Header
              header="DISCOVER THE CHARM OF THE LUVIANA"
              title="Rooms & Luxury Suites"
            />
            <p className="mt-10 text-[#5f6060]">
              The rooms are arranged on the first, second and third floors. On
              the top floor, there is also a charming terrace or solarium
              available for the use of guests, from where you can enjoy the
              wonderful view. A cup of tea or coffee, favorite book on the
              table, and breath-taking view in front – this is all you need to
              relax and to feel delightful emotions of your vacation.
            </p>
          </div>
        </div>
      </section>

      {/* Founder section */}

      <section>
        <div className="mx-5 md:mx-10 xl:mx-20 mt-20">
          <Header
            header="We’re impartial and independent, and every day we create distinctive, world-class programmes and content"
            title="Founder"
            headerStyle="text-lg"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 xl:gap-20 mt-10 md:mt-20">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="flex flex-col items-center space-y-5"
              >
                <Image
                  src={`/assets/about-images/${founder.src}`}
                  alt="about image"
                  width={200}
                  height={200}
                  className="w-40 h-40 object-cover rounded-full"
                />
                <h3 className="text-xl font-semibold">{founder.name}</h3>
                <p className="text-[#5f6060]">{founder.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutLuviana;
