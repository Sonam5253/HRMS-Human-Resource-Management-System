
import {
  Users,
  CalendarDays,
  Wallet,
  Briefcase,
  ClipboardList,
  CheckSquare,
  Bell,
  Clock3,
} from "lucide-react";

import { ROLES } from "./roles";

export const dashboardSections = {
  [ROLES.ADMIN]: {
    stats: [
      {
        title: "Total Employees",
        value: "110",
        icon: Users,
        color: "text-brand",
      },
      {
        title: "Pending Leaves",
        value: "8",
        icon: CalendarDays,
        color: "text-orange-500",
      },
      {
        title: "Departments",
        value: "7",
        icon: Briefcase,
        color: "text-sky-500",
      },
      {
        title: "Payroll",
        value: "₹12L",
        icon: Wallet,
        color: "text-emerald-500",
      },
    ],
    showCharts: true,
    showPayroll: true,
    showTeam: true,
    showLeaderboard: true,
  },

  [ROLES.HR]: {
    stats: [
      {
        title: "Total Employees",
        value: "120",
        icon: Users,
        color: "text-brand",
      },
      {
        title: "Pending Leaves",
        value: "8",
        icon: CalendarDays,
        color: "text-orange-500",
      },
      {
        title: "Attendance Rate",
        value: "92%",
        icon: Clock3,
        color: "text-sky-500",
      },
      {
        title: "Open Positions",
        value: "6",
        icon: Briefcase,
        color: "text-emerald-500",
      },
    ],
    showCharts: true,
    showPayroll: true,
    showTeam: true,
    showLeaderboard: false,
  },

  [ROLES.TEAM_LEADER]: {
    stats: [
      {
        title: "Team Members",
        value: "12",
        icon: Users,
        color: "text-brand",
      },
      {
        title: "Pending Tasks",
        value: "5",
        icon: ClipboardList,
        color: "text-orange-500",
      },
      {
        title: "Applied Leaves",
        value: "3",
        icon: CalendarDays,
        color: "text-red-500",
      },
      {
        title: "Attendance",
        value: "95%",
        icon: CheckSquare,
        color: "text-emerald-500",
      },
    ],
    showCharts: false,
    showPayroll: false,
    showTeam: true,
    showLeaderboard: false,
  },

  [ROLES.EMPLOYEE]: {
    stats: [
      {
        title: "Attendance",
        value: "98%",
        icon: CheckSquare,
        color: "text-brand",
      },
      {
        title: "Leave Left",
        value: "24",
        icon: CalendarDays,
        color: "text-orange-500",
      },
      {
        title: "Tasks",
        value: "7",
        icon: ClipboardList,
        color: "text-sky-500",
      },
      {
        title: "Notifications",
        value: "5",
        icon: Bell,
        color: "text-emerald-500",
      },
    ],
    showCharts: false,
    showPayroll: true,
    showTeam: false,
    showLeaderboard: false,
  },
};
