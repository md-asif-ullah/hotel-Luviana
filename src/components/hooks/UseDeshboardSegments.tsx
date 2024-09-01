import { FaHouse } from "react-icons/fa6";
import { useAuth } from "./useAuth";

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
      ]
    : [];
  return deshboardSegments;
}
export default useDeshboardSegments;
