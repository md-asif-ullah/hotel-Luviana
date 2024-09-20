type StatCardProps = {
  count: number;
  label: string;
  icon: any;
  iconColor: string;
};

export const BookingCard = ({
  count = 0,
  label,
  icon,
  iconColor,
}: StatCardProps) => {
  return (
    <div className=" p-4 rounded-lg shadow-lg flex flex-col items-center text-center">
      <div className="flex items-center gap-4 text-black mb-2">
        <i className={`text-3xl ${iconColor}`}>{icon}</i>
        <h2 className="text-4xl font-bold">{count}</h2>
      </div>
      <p className="text-sm sm:text-base text-black">{label}</p>
    </div>
  );
};
