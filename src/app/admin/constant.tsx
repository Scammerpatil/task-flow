import { SideNavItem } from "@/types/types";
import {
  IconUsers,
  IconSettings,
  IconHome,
  IconFileText,
  IconGraph,
  IconHelpCircle,
  IconManualGearbox,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Manage Oragnizations",
    path: "/admin/manage-organizations",
    icon: <IconManualGearbox width="24" height="24" />,
  },
  {
    title: "Manage Users",
    path: "/admin/manage-users",
    icon: <IconUsers width="24" height="24" />,
  },
  {
    title: "Projects Overview",
    path: "/admin/projects",
    icon: <IconFileText width="24" height="24" />,
  },
  {
    title: "Analytics",
    path: "/admin/analytics",
    icon: <IconGraph width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <IconSettings width="24" height="24" />,
  },
  {
    title: "Support",
    path: "/admin/support",
    icon: <IconHelpCircle width="24" height="24" />,
  },
];
