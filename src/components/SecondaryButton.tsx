import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function SecondaryButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <Button
      className={cn(
        "rounded-full md:px-10 md:py-7 px-7 py-5 duration-500 bg-primary2 hover:bg-[#0a2370]",
        className
      )}
    >
      {text}
    </Button>
  );
}

export default SecondaryButton;
