import Link from "next/link";
import {
  Home,
  Compass,
  Library,
  Users,
  BarChart,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Separator } from "./ui/separator";
const menuItems = [
  { icon: Home, text: "For You", href: "/" },
  { icon: Compass, text: "Explore", href: "/explore" },
  { icon: Library, text: "My Library", href: "/library" },
  { icon: Users, text: "Spaces", href: "/spaces" },
  { icon: BarChart, text: "Highlights", href: "/highlights" },
  { icon: Calendar, text: "Live Sessions", href: "/sessions" },
];

const bottomMenuItems = [
  { icon: Settings, text: "Settings", href: "/settings" },
  { icon: HelpCircle, text: "Help & support", href: "/help" },
  { icon: LogOut, text: "Logout", href: "/logout" },
];

export function SidebarContent() {
  return (
    <div className="flex flex-col h-full">
      <nav className="flex-grow">
        <ul>
          {menuItems.map((item) => (
            <li key={item.text}>
              <Link
                href={item.href}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Separator className="my-2"></Separator>
        <ul>
          {bottomMenuItems.map((item) => (
            <li key={item.text}>
              <Link
                href={item.href}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:block w-64 p-4 border-r border-gray-200 dark:border-gray-700 bg-secondary">
      <div className="mb-8">
        {/* Placeholder for Logo */}
        <h1 className="text-2xl font-bold">Blinkist</h1>
      </div>
      <SidebarContent />
    </aside>
  );
}
