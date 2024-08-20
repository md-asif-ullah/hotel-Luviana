import { CgProfile } from "react-icons/cg";

interface Pagetype {
  label: string;
  to: string;
  icon: JSX.Element;
}

function useDeshboardSegments() {
  const isAdmin = true;

  const deshboardSegments: Pagetype[] = isAdmin
    ? [
        {
          label: "Profile",
          to: "/deshbord/profile",
          icon: <CgProfile />,
        },
      ]
    : [];
  return deshboardSegments;
}
export default useDeshboardSegments;
