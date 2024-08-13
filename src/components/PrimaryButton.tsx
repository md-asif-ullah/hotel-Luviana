"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function PrimaryButton({ text, style }: { text: string; style?: string }) {
  return (
    <Button
      className={cn(
        "rounded-full md:px-10 md:py-7 px-7 py-5 duration-500 border hover:bg-primary2 border-white hover:border-primary2 bg-transparent",
        style
      )}
    >
      {text}
    </Button>
  );
}

export default PrimaryButton;
