import { cn } from "@/lib/utils";

type InfomationSectionProps = {
  title: string;
  description: string;
  className?: string;
};

function InfomationSection({
  title,
  description,
  className,
}: InfomationSectionProps) {
  return (
    <section className={cn("text-start max-w-md mx-auto lg:mx-0", className)}>
      <h3 className="text-4xl text-black font-medium">{title}</h3>
      <p className="text-gray-600 text-sm mt-4">{description}</p>
    </section>
  );
}

export default InfomationSection;
