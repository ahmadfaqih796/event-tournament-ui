import { LayoutDashboardIcon, UserPlusIcon } from "vue-tabler-icons";

export interface menu {
  header?: string;
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
  { header: "Home" },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/admin/dashboard",
  },
  { header: "Management" },
  {
    title: "User",
    icon: UserPlusIcon,
    to: "/admin/managements/users",
  },
];

export default sidebarItem;
