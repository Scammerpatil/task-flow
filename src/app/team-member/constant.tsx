import { SideNavItem } from "@/types/types";
import {
  IconFileText,
  IconHelpCircle,
  IconHome,
  IconListCheck,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/team-member/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "My Tasks",
    path: "/team-member/tasks",
    icon: <IconListCheck width="24" height="24" />,
  },
  {
    title: "Project Files",
    path: "/team-member/files",
    icon: <IconFileText width="24" height="24" />,
  },
  {
    title: "Team Chat",
    path: "/team-member/chat",
    icon: <IconUsers width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/team-member/settings",
    icon: <IconSettings width="24" height="24" />,
  },
  {
    title: "Support",
    path: "/team-member/support",
    icon: <IconHelpCircle width="24" height="24" />,
  },
];
