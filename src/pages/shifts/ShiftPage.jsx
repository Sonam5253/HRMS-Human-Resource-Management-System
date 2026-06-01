import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import {
  getShiftsApi,
  createShiftApi,
  updateShiftApi,
  deleteShiftApi,
  getShiftByIdApi,
  getShiftAttendanceApi,
} from "../../services/shiftService";

import ShiftStats from "../../components/shifts/ShiftStats";
import ShiftFilters from "../../components/shifts/ShiftFilters";
import ShiftTable from "../../components/shifts/ShiftTable";
import ShiftCard from "../../components/shifts/ShiftCard";
import ShiftModal from "../../components/shifts/ShiftModal";
import ShiftDetailsModal from "../../components/shifts/ShiftDetailsModal";
import AttendanceReportModal from "../../components/shifts/AttendanceReportModal";
import DeleteConfirm from "../../components/commons/DeleteConfirm";

export default function ShiftPage() {
  const [shifts, setShifts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [openModal, setOpenModal] = useState(false);
  const [editingShift, setEditingShift] = useState(null);

  const [selectedShift, setSelectedShift] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const fetchShifts = async () => {
    try {
      const res = await getShiftsApi();
      setShifts(res?.data || []);
    } catch (err) {
      console.log("Shift fetch error:", err);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const filteredShifts = useMemo(() => {
    return shifts.filter((item) => {
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && item.isActive) ||
        (filter === "inactive" && !item.isActive);

      return matchesSearch && matchesFilter;
    });
  }, [shifts, search, filter]);

  const handleSubmit = async (payload) => {
    try {
      if (editingShift) {
        await updateShiftApi(editingShift._id, payload);
      } else {
        await createShiftApi(payload);
      }

      setOpenModal(false);
      setEditingShift(null);
      fetchShifts();
    } catch (err) {
      console.log("Shift save error:", err);
    }
  };

  const handleView = async (id) => {
    try {
      const res = await getShiftByIdApi(id);
      setSelectedShift(res?.data);
    } catch (err) {
      console.log("Shift details error:", err);
    }
  };

  const handleAttendance = async (id) => {
    try {
      const res = await getShiftAttendanceApi(id);
      setAttendanceData(res);
    } catch (err) {
      console.log("Attendance report error:", err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Shifts</h1>
          <p className="text-xs text-slate-500">
            Manage all company shifts
          </p>
        </div>

        <button
          onClick={() => {
            setEditingShift(null);
            setOpenModal(true);
          }}
          className="flex h-8 items-center gap-1 rounded-xl bg-violet-600 px-3 text-xs font-medium text-white hover:bg-violet-700"
        >
          <Plus size={14} />
          New Shift
        </button>
      </div>

      <ShiftStats shifts={shifts} />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <ShiftFilters
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        <ShiftTable
          shifts={filteredShifts}
          onEdit={(item) => {
            setEditingShift(item);
            setOpenModal(true);
          }}
          onDelete={(id) => {
            setDeleteId(id);
          }}
          onView={(item) => {
            handleView(item._id);
          }}
          onReport={(id) => {
            handleAttendance(id);
          }}
        />

        <div className="grid gap-3 p-3 md:hidden">
          {filteredShifts.map((item) => (
            <ShiftCard
              key={item._id}
              item={item}
              onEdit={(shift) => {
                setEditingShift(shift);
                setOpenModal(true);
              }}
              onDelete={() => {
                setDeleteId(item._id);
              }}
              onView={() => {
                handleView(item._id);
              }}
              onReport={() => {
                handleAttendance(item._id);
              }}
            />
          ))}
        </div>
      </div>

      <ShiftModal
        open={openModal}
        editingShift={editingShift}
        onSubmit={handleSubmit}
        onClose={() => {
          setOpenModal(false);
          setEditingShift(null);
        }}
      />

      <ShiftDetailsModal
        data={selectedShift}
        onClose={() => {
          setSelectedShift(null);
        }}
      />

      <AttendanceReportModal
        data={attendanceData}
        onClose={() => {
          setAttendanceData(null);
        }}
      />

      <DeleteConfirm
        open={!!deleteId}
        title="Delete Shift?"
        message="Are you sure you want to delete this shift? This action cannot be undone."
        onClose={() => {
          setDeleteId(null);
        }}
        onConfirm={async () => {
          try {
            await deleteShiftApi(deleteId);
            setDeleteId(null);
            fetchShifts();
          } catch (err) {
            console.log("Delete shift error:", err);
          }
        }}
      />
    </div>
  );
}