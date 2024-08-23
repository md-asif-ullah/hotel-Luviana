import { FaHouse } from "react-icons/fa6";

interface Pagetype {
  label: string;
  to: string;
  icon: JSX.Element;
}

function useDeshboardSegments() {
  // TODO: Check if user is admin or not

  const isAdmin = true;

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
