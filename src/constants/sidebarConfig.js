
import {
  LayoutDashboard,
  CalendarDays,
  CheckSquare,
  Wallet,
  Users,
  ClipboardList,
  Building2,
  Briefcase,
  Clock3,
} from "lucide-react";

import { ROLES } from "./roles";

export const sidebarItems = [
  {
  label: "Dashboard",
  icon: LayoutDashboard,
  roles: [
    ROLES.ADMIN,
    ROLES.HR,
    ROLES.TEAM_LEADER,
    ROLES.EMPLOYEE,
  ],
  getPath: (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return "/admin/dashboard";

      case ROLES.HR:
        return "/hr/dashboard";

      case ROLES.TEAM_LEADER:
        return "/team-leader/dashboard";

      case ROLES.EMPLOYEE:
      default:
        return "/employee/dashboard";
    }
  },
},

  {
    label: "Attendance",
    path: "/attendance",
    icon: CalendarDays,
    roles: [
      ROLES.ADMIN,
      ROLES.HR,
      ROLES.TEAM_LEADER,
      ROLES.EMPLOYEE,
    ],
  },

  {
    label: "Tasks",
    path: "/tasks",
    icon: ClipboardList,
    roles: [ROLES.ADMIN, ROLES.HR, ROLES.TEAM_LEADER],
  },

  {
    label: "My Tasks",
    path: "/my-tasks",
    icon: CheckSquare,
    roles: [ROLES.EMPLOYEE],
  },

  {
    label: "Team Members",
    path: "/team",
    icon: Users,
    roles: [ROLES.TEAM_LEADER],
  },

  {
    label: "Staff Management",
    path: "/staff",
    icon: Users,
    roles: [ROLES.ADMIN, ROLES.HR],
  },

  {
    label: "Departments",
    path: "/departments",
    icon: Building2,
    roles: [ROLES.ADMIN],
  },

  {
    label: "Clients",
    path: "/clients",
    icon: Briefcase,
    roles: [ROLES.ADMIN, ROLES.HR],
  },

  {
    label: "Projects",
    path: "/projects",
    icon: Briefcase,
    roles: [ROLES.ADMIN, ROLES.HR, ROLES.TEAM_LEADER],
  },

  {
    label: "Shifts",
    path: "/shifts",
    icon: Clock3,
    roles: [ROLES.ADMIN, ROLES.HR],
  },

  {
    label: "Payroll",
    path: "/payroll",
    icon: Wallet,
    roles: [ROLES.ADMIN, ROLES.HR, ROLES.EMPLOYEE],
  },
];
