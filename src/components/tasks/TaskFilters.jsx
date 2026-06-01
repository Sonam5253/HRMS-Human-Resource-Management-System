// src/components/TaskFilters.jsx
import { useState, useEffect, useRef } from "react";
import RoundedSelect from "./RoundedSelect";

export default function TaskFilters({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  filterDays,
  setFilterDays,
  filterAssignee,
  setFilterAssignee,
  filterLabel,
  setFilterLabel,
  filterCategory,
  setFilterCategory,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    }
    if (mobileOpen) {
      document.addEventListener("mousedown", handleOutside);
    }
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [mobileOpen]);

  const DesktopFilters = () => (
    <div
      className="
        hidden md:block mb-4 p-4 rounded-2xl
        bg-white dark:bg-[#1D2125]
        border border-gray-200 dark:border-white/10

        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-indigo-300
        dark:hover:border-indigo-500/40
      "
    >

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <RoundedSelect
          value={filterStatus}
          onChange={setFilterStatus}
          placeholder="All Status"
          options={[
            { label: "All Status", value: "All Status  " },
            { label: "Pending", value: "Pending" },
            { label: "In Progress", value: "In Progress" },
            { label: "Review", value: "Review" },
            { label: "Completed", value: "Completed" },
          ]}
        />

        <RoundedSelect
          value={filterPriority}
          onChange={setFilterPriority}
          placeholder="All Priority"
          options={[
            { label: "All Priority", value: "All" },
            { label: "High", value: "High" },
            { label: "Medium", value: "Medium" },
            { label: "Low", value: "Low" },
          ]}
        />

        <RoundedSelect
          value={filterDays}
          onChange={setFilterDays}
          placeholder="All Days"
          options={[
            { label: "All Days", value: "All" },
            { label: "Next 7 Days", value: "7" },
            { label: "Next 15 Days", value: "15" },
            { label: "Next 30 Days", value: "30" },
          ]}
        />

        <RoundedSelect
          value={filterAssignee}
          onChange={setFilterAssignee}
          placeholder="All Assignees"
          options={[
            { label: "All Assignees", value: "All" },
            { label: "Unassigned", value: "Unassigned" },
            { label: "Assigned", value: "Assigned" },
            { label: "Assigned to me", value: "Sonam" },
          ]}
        />

        <RoundedSelect
          value={filterLabel}
          onChange={setFilterLabel}
          placeholder="All Labels"
          options={[
            { label: "All Labels", value: "All" },
            { label: "HR", value: "HR" },
            { label: "Bug", value: "Bug" },
            { label: "Feature", value: "Feature" },
          ]}
        />

        <RoundedSelect
          value={filterCategory}
          onChange={setFilterCategory}
          placeholder="All Categories"
          options={[
            { label: "All Categories", value: "All" },
            { label: "Attendance", value: "Attendance" },
            { label: "Payroll", value: "Payroll" },
            { label: "HR", value: "HR" },
          ]}
        />
      </div>
    </div>
  );

  return <DesktopFilters />;
}
