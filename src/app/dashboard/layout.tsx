import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Separator } from "@/components/ui/separator";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <DashboardNavbar />
      <div className="flex overflow-hidden">
        <div className=" hidden lg:flex">
          <div>
            <DashboardSidebar />
          </div>
          <Separator orientation="vertical" />
        </div>

        <div className="w-full lg:w-[75%] xl:w-[81%]">{children}</div>
      </div>
    </main>
  );
}

export default layout;
