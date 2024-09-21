import { cn } from "@/lib/utils";

type StatCardProps = {
  count: number;
  label: string;
  icon: any;
};

export const BookingCard = ({ count = 0, label, icon }: StatCardProps) => {
  return (
    <div className="p-4 rounded-lg shadow-lg flex flex-col items-center text-center">
      <div className="flex items-center gap-4 text-black mb-2">
        <i
          className={cn("text-3xl", {
            "text-yellow-500": label === "Pending bookings",
            "text-blue-600": label === "Confirmed bookings",
            "text-red-600": label === "Cancelled bookings",
            "text-green-500": label === "Completed bookings",
          })}
        >
          {icon}
        </i>
        <h2 className="text-4xl font-bold">{count}</h2>
      </div>
      <p className="text-sm sm:text-base text-black">{label}</p>
    </div>
  );
};
