import { cn } from "@/lib/utils";

type HeaderProps = {
  header: string;
  title: string;
  headerStyle?: string;
  titleStyle?: string;
};

function Header({ header, title, headerStyle, titleStyle }: HeaderProps) {
  return (
    <>
      <div className="bg-primary2 py-0.5 w-[70px] rounded-lg"></div>
      <p className={cn("mt-4 text-sm", headerStyle)}>{header}</p>
      <h1 className={cn("mt-5 text-4xl", titleStyle)}>{title}</h1>
    </>
  );
}

export default Header;
