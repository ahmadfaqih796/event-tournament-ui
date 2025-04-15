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
    access: ["admin", "komunitas", "peserta"],
  },
  {
    title: "User",
    icon: UserPlusIcon,
    to: "/admin/managements/users",
    access: ["admin"],
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
  // {
  //   title: "Account Games",
  //   icon: UserPlusIcon,
  //   to: "/admin/managements/accountgames",
  //   access: ["peserta", 'admin'],
  // },
  {
    title: "Teams",
    icon: UserPlusIcon,
    to: "/admin/managements/teams",
    access: ["admin", "peserta"],
  },
  {
    header: "Data",
    access: ["admin", "komunitas"],
  },
  {
    title: "Tournament",
    icon: UserPlusIcon,
    to: "/admin/data/tournaments",
    access: ["admin", "komunitas"],
  },
  {
    title: "Berita",
    icon: UserPlusIcon,
    to: "/admin/data/berita",
    access: ["admin", "komunitas"],
  },
  {
    header: "Information",
    access: ["peserta", "komunitas"],
  },
  {
    title: "Tournament",
    icon: UserPlusIcon,
    to: "/admin/info/tournaments",
    access: ["peserta"],
  },
  {
    title: "Transaksi",
    icon: UserPlusIcon,
    to: "/admin/info/transactions",
    access: ["peserta", "komunitas"],
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
