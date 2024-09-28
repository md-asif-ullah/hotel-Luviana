import { FaHouse } from "react-icons/fa6";
import { useAuth } from "./useAuth";
import { IoIosPeople } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";
import { MdOutlineHouse } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

interface Pagetype {
  label: string;
  to: string;
  icon: JSX.Element;
}

function useDashboardSegments() {
  const { user } = useAuth();

  const isAdmin = user?.isAdmin;

  const dashboardSegments: Pagetype[] = isAdmin
    ? [
        {
          label: "Add Room",
          to: "/dashboard/add-room",
          icon: <FaHouse />,
        },
        {
          label: "Customers",
          to: "/dashboard/customers",
          icon: <IoIosPeople />,
        },
        {
          label: "Bookings",
          to: "/dashboard/booking-list",
          icon: <CiCircleList />,
        },
        {
          label: "Rooms",
          to: "/dashboard/rooms",
          icon: <MdOutlineHouse />,
        },
      ]
    : [
        {
          label: "Profile",
          to: "/dashboard/profile",
          icon: <CgProfile />,
        },
        {
          label: "Booking",
          to: "/dashboard/booking",
          icon: <CiCircleList />,
        },
      ];
  return dashboardSegments;
}
export default useDashboardSegments;
