import DeshboardNavbar from "@/components/DeshboardNavbar";
import DeshboardSidebar from "@/components/DeshboardSidebar";
import { Separator } from "@/components/ui/separator";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <DeshboardNavbar />
      <div className="flex overflow-hidden">
        <div className=" hidden lg:flex">
          <div>
            <DeshboardSidebar />
          </div>
          <Separator orientation="vertical" />
        </div>

        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}

export default layout;
