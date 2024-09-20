import { FaHouse } from "react-icons/fa6";
import { useAuth } from "./useAuth";
import { IoIosPeople } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";

interface Pagetype {
  label: string;
  to: string;
  icon: JSX.Element;
}

function useDeshboardSegments() {
  const { user } = useAuth();

  const isAdmin = user?.isAdmin;

  const deshboardSegments: Pagetype[] = isAdmin
    ? [
        {
          label: "Add Room",
          to: "/deshboard/add-room",
          icon: <FaHouse />,
        },
        {
          label: "Customers",
          to: "/deshboard/customers",
          icon: <IoIosPeople />,
        },
        {
          label: "Bookings",
          to: "/deshboard/booking-list",
          icon: <CiCircleList />,
        },
      ]
    : [];
  return deshboardSegments;
}
export default useDeshboardSegments;
