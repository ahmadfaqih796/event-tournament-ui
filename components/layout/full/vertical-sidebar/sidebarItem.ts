import { LayoutDashboardIcon, UserPlusIcon } from "vue-tabler-icons";

export interface menu {
  header?: string;
  access?: string[];
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  {
    header: "Home",
  },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/admin/dashboard",
  },
  {
    header: "Management",
    access: ["admin", "komunitas"],
  },
  {
    title: "User",
    icon: UserPlusIcon,
    to: "/admin/managements/users",
    access: ["admin", "komunitas"],
  },
  {
    title: "Games",
    icon: UserPlusIcon,
    to: "/admin/managements/games",
    access: ["admin"],
  },
  {
    title: "Events",
    icon: UserPlusIcon,
    to: "/admin/managements/events",
    access: ["admin", "komunitas"],
  },
  {
    header: "Data",
    access: ["admin", "komunitas"],
  },
  {
    title: "Tournaments",
    icon: UserPlusIcon,
    to: "/admin/data/tournaments",
    access: ["admin", "komunitas"],
  },
  {
    title: "Team",
    icon: UserPlusIcon,
    to: "/admin/data/teams",
    access: ["admin", "komunitas"],
  },
  {
    title: "Transaksi",
    icon: UserPlusIcon,
    to: "/admin/data/transaksi",
    access: ["admin", "komunitas"],
  },
];

export default sidebarItem;
