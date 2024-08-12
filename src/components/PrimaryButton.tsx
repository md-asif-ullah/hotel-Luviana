"use client";

import { Button } from "./ui/button";

function PrimaryButton({ text }: { text: string }) {
  return (
    <Button className="rounded-full md:px-10 md:py-7 px-7 py-5 duration-500 border hover:bg-primary2 border-white hover:border-primary2 bg-transparent mt-6">
      {text}
    </Button>
  );
}

export default PrimaryButton;
