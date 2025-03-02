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
    header: "Homed",
  },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/admin/dashboard",
  },
  {
    header: "Management",
    access: ["admin", "komunitas", "peserta"],
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
    title: "Account Games",
    icon: UserPlusIcon,
    to: "/admin/managements/accountgames",
    access: ["peserta", 'admin'],
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
  {
    header: "Setting",
    access: ["admin", "komunitas", "peserta"],
  },
  {
    title: "Profile",
    icon: UserPlusIcon,
    to: "/admin/setting/profile",
    access: ["admin", "komunitas", "peserta"],
  },
];

export default sidebarItem;
