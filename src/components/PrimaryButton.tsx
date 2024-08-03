"use client";

import { Button } from "./ui/button";

function PrimaryButton({ text }: { text: string }) {
  return (
    <Button
      className={`${
        text === "MORE INFO"
          ? "hover:bg-primary2 border-white hover:border-primary2 bg-transparent mt-6"
          : "hover:bg-secondary2 bg-primary2 border-primary2 hover:border-secondary2"
      } rounded-full md:px-10 md:py-7 px-7 py-5 duration-500 border`}
    >
      MORE INFO
    </Button>
  );
}

export default PrimaryButton;
