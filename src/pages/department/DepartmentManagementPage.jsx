import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";

import DepartmentHeader from "../../components/department/DepartmentHeader";
import DepartmentStats from "../../components/department/DepartmentStats";
import DepartmentTable from "../../components/department/DepartmentTable";
import DepartmentDetails from "../../components/department/DepartmentDetails";
import CreateDepartmentModal from "../../components/department/CreateDepartmentModal";
import EditDepartmentModal from "../../components/department/EditDepartmentModal";
import DeleteConfirm from "../../components/commons/DeleteConfirm";

// ✅🔥 IMPORTANT FIX (missing import)
import DesignationSection from "../../components/designation/DesignationSection";

import {
  getDepartments,
  getDepartmentHierarchy,
  deleteDepartment,
} from "../../services/departmentApi";

export default function DepartmentManagementPage() {
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [view, setView] = useState("departments");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const response = await getDepartments();

      const formattedDepartments = await Promise.all(
        (response?.data || []).map(async (item) => {
          let hrCount = 0;
          let leaderCount = 0;
          let employeeCount = 0;

          try {
            const hrResponse = await getDepartmentHierarchy(item._id);
            const hrs = hrResponse?.HR || [];

            hrCount = hrs.length;
            employeeCount = hrResponse?.Direct_Employees?.length || 0;

            for (const hr of hrs) {
              const leaderResponse = await getDepartmentHierarchy(
                item._id,
                [hr._id]
              );

              const leaders = leaderResponse?.Team_Leaders || [];
              leaderCount += leaders.length;

              for (const leader of leaders) {
                const employeeResponse = await getDepartmentHierarchy(
                  item._id,
                  [hr._id],
                  [leader._id]
                );

                const employees = employeeResponse?.employees || [];
                employeeCount += employees.length;
              }
            }
          } catch (error) {
            console.error(`Hierarchy error for ${item.name}`, error);
          }

          return {
          _id: item._id,
          id: item._id,

          name: item.name,
          description: item.description || "",

          createdAt: item.createdAt,
          updatedAt: item.updatedAt,

          hrs: hrCount,
          leaders: leaderCount,
          employees: employeeCount,

          icon: Monitor,
          color: "bg-blue-100 text-blue-600",
        };
        })
      );

      setDepartmentList(formattedDepartments);

      setSelectedDepartment(
        formattedDepartments.length > 0
          ? formattedDepartments[0]
          : null
      );
    } catch (error) {
      console.error("Failed to fetch departments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="space-y-3 p-1">

      {/* HEADER */}
      <DepartmentHeader
        view={view}
        setView={setView}
        onCreate={() => {
          if (view === "departments") {
            setShowCreateModal(true);
          } else {
            // open designation modal
            setShowDesignationModal(true);
          }
        }}
      />

      {/* 🔥 DEPARTMENTS VIEW */}
      {view === "departments" && (
        <>
          <DepartmentStats departments={departmentList} />

          <DepartmentTable
            departments={departmentList}
            selectedDepartment={selectedDepartment}
            onSelect={setSelectedDepartment}
            onEdit={(department) => {
              setSelectedDepartment(department);
              setShowEditModal(true);
            }}
            onDelete={(department) => {
              setSelectedDepartment(department);
              setShowDeleteModal(true);
            }}
          />

          {selectedDepartment && (
            <DepartmentDetails
              department={selectedDepartment}
              onEdit={() => setShowEditModal(true)}
            />
          )}
        </>
      )}

      {/* 🔥 DESIGNATIONS VIEW */}
      {view === "designations" && selectedDepartment?.id && (
        <DesignationSection selectedDepartment={selectedDepartment} />
      )}

      {/* MODALS */}
      {showCreateModal && (
        <CreateDepartmentModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            fetchDepartments();
          }}
        />
      )}

      {showEditModal && selectedDepartment && (
        <EditDepartmentModal
          department={selectedDepartment}
          onClose={() => setShowEditModal(false)}
          onUpdated={() => {
            setShowEditModal(false);
            fetchDepartments();
          }}
        />
      )}

      <DeleteConfirm
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          await deleteDepartment(selectedDepartment.id);
          fetchDepartments();
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
}