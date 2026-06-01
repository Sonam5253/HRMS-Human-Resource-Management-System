import { useState } from "react";
import DepartmentStats from "../../components/department/DepartmentStats";
import DepartmentToolbar from "../../components/department/DepartmentToolbar";
import DepartmentGrid from "../../components/department/DepartmentGrid";
import CreateDepartmentModal from "../../components/department/CreateDepartmentModal";
import DepartmentDetailsDrawer from "../../components/department/DepartmentDetailsDrawer";

export default function DepartmentManagement() {
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  return (
    <div className="space-y-6 p-6">
      <DepartmentStats />

      <DepartmentToolbar
        onCreate={() => setOpenCreate(true)}
      />

      <DepartmentGrid
        onView={(department) => setSelectedDepartment(department)}
      />

      <CreateDepartmentModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />

      <DepartmentDetailsDrawer
        department={selectedDepartment}
        onClose={() => setSelectedDepartment(null)}
      />
    </div>
  );
}