"use client";

import Link from "next/link";
import useDeshboardSegments from "./hooks/UseDeshboardSegments";
import { usePathname } from "next/navigation";

function DeshboardSidebar() {
  const pathname = usePathname();
  const deshboardSegments = useDeshboardSegments();

  return (
    <div className="space-y-2 flex flex-col bg-white h-full pl-5 w-64 pt-10">
      {deshboardSegments.map((segment, index) => {
        const isActive = pathname === segment.to;

        return (
          <Link
            href={segment.to}
            key={index}
            className={`flex items-center space-x-3 py-2.5 pl-5 mr-5 rounded-lg transition-colors duration-300 ${
              isActive
                ? "bg-[#b4a889] text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <div className="text-xl">
              <i
                className={`text-xl font-medium ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              >
                {segment.icon}
              </i>
            </div>
            <h3
              className={`text-lg font-medium ${
                isActive ? "text-white" : "text-gray-700"
              }`}
            >
              {segment.label}
            </h3>
          </Link>
        );
      })}
    </div>
  );
}

export default DeshboardSidebar;
