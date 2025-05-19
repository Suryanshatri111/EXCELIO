import Header from "../../../components/common/Header";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Activity,
  FileBarChart,
  Settings,
  Menu,
} from "lucide-react";
const UserDashboard = () => {
  const navItems = [
    {
      path: "/dashboard",
      label: "DashBoard",
      icon: LayoutDashboard,
    },
    {
      path: "/dashboard/excel",
      label: "ExcelFile",
      icon: FileBarChart,
    },
    {
      path: "/dashboard/histroy",
      label: "Histroy",
      icon: Activity,
    },
    {
      path: "/dashboard/user",
      label: "User",
      icon: Users,
    },
    {
      path: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  const navLinkStyle = ({ isActive }) =>
    `flex items-center space-x-5
         px-4 py-2 rounded-lg transition-all duration-200 text-lg font-medium  ${
           isActive
             ? "bg-indigo-600 text-white"
             : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700"
         }`;

  return (
    <div className="bg-black text-white min-h-screen ">
      <Header />
      <div className="flex ">
        <aside className="flex flex-col w-64 p-4 transition-all duration-300 bg-white dark:bg-[#1F2937] shadow-md h-[55rem] ">
          <nav className="flex flex-col gap-2 mt-8 space-y-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navLinkStyle}
                >
                  <Icon size={24} />

                  <span className="whitespace-nowrap">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
