type HeaderProps = {
  header: string;
  title: string;
};

function Header({ header, title }: HeaderProps) {
  return (
    <>
      <div className="bg-primary2 py-0.5 w-[70px] rounded-lg"></div>
      <p className="mt-4 text-sm">{header}</p>
      <h1 className="mt-5 text-4xl">{title}</h1>
    </>
  );
}

export default Header;
