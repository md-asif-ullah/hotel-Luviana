import { Button } from "./ui/button";

function SecondaryButton({ text }: { text: string }) {
  return (
    <Button className="rounded-full md:px-10 md:py-7 px-7 py-5 duration-500 bg-primary2 hover:bg-[#0a2370] mt-6">
      {text}
    </Button>
  );
}

export default SecondaryButton;
