import { SideNavItem } from "@/types/types";
import {
  IconGraph,
  IconHelpCircle,
  IconHome,
  IconListCheck,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/manager/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Team Management",
    path: "/manager/team",
    icon: <IconUsers width="24" height="24" />,
  },
  {
    title: "Tasks & Projects",
    path: "/manager/tasks",
    icon: <IconListCheck width="24" height="24" />,
  },
  {
    title: "Support",
    path: "/manager/support",
    icon: <IconHelpCircle width="24" height="24" />,
  },
];
