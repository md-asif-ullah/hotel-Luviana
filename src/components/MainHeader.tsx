import Image from "next/image";

function MainHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center mx-4 md:mx-10 lg:mx-40 xl:mx-72">
      <Image
        src="/assets/shared-images/header_default.png"
        alt="Main Header"
        width={200}
        height={200}
        className="mx-auto w-40 h-auto"
      />
      <h3 className="text-4xl font-medium mt-7">{title}</h3>
      <p className="mt-5 text-[#222222]">{description}</p>
    </div>
  );
}

export default MainHeader;
