import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import ProssingAnimation from "./ProssingAnimation";

type Props = {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
};

function SecondaryButton({ text, className, type, loading }: Props) {
  return (
    <Button
      disabled={loading}
      type={type}
      className={cn(
        "rounded-full md:px-10 md:py-7 px-7 py-5 duration-500 bg-primary2 hover:bg-[#0a2370]",
        className
      )}
    >
      {loading ? <ProssingAnimation /> : text}
    </Button>
  );
}

export default SecondaryButton;
