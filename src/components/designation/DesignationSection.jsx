import { useEffect, useState } from "react";
import api from "../../api/axios";
import Button from "../commons/Button";
import Modal from "../commons/Modal";
import DesignationForm from "./DesignationForm";
import Card from "../commons/Card";
import { Filter } from "lucide-react";

import {
  createDesignation,
  getDesignationByDepartment,
} from "../../services/designationService";

export default function DesignationSection() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH DEPARTMENTS
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/departments/get");
        setDepartments(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDepartments();
  }, []);

  // 🔥 FETCH DESIGNATIONS
  const fetchDesignations = async (deptId) => {
    if (!deptId) return;

    try {
      const res = await getDesignationByDepartment(deptId);
      setList(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDesignations(selectedDept);
  }, [selectedDept]);

  // 🔥 CREATE
  const handleCreate = async (data) => {
    try {
      setLoading(true);

      await createDesignation(data);

      setSelectedDept(data.department);
      setOpen(false);

      fetchDesignations(data.department);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-800">
          Designations
        </h1>

        <Button
          text="+ Add Designation"
          width="auto"
          onClick={() => setOpen(true)}
          className="shrink-0 whitespace-nowrap px-3 py-2 text-sm"
        />
      </div>

      {/* 🔥 MAIN CARD */}
      <Card className="bg-white p-4 sm:p-6 space-y-4">

        {/* 🔥 COUNT + FILTER (IMPORTANT FIX) */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto">

          {/* LEFT */}
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-slate-700">
              Designations
            </p>

            <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs font-medium">
              {list.length}
            </span>
          </div>

          {/* RIGHT FILTER */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm w-full sm:w-[220px] bg-slate-50 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* 🔥 LIST */}
        {!selectedDept ? (
          <div className="text-center py-10 text-gray-400">
            Select a department first
          </div>
        ) : list.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No designations found
          </div>
        ) : (
          <div className="space-y-3">

            {list.map((d) => (
              <Card
                key={d._id}
                className="p-4 hover:shadow-sm transition cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                  {/* LEFT */}
                  <div>
                    <p className="font-medium text-slate-800">
                      {d.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {d.title}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="text-sm font-medium text-green-600">
                    ₹ {d.salaryRange?.min} - ₹ {d.salaryRange?.max}
                  </div>
                </div>
              </Card>
            ))}

          </div>
        )}
      </Card>

      {/* 🔥 MODAL */}
      {open && (
        <Modal title="Create Designation" onClose={() => setOpen(false)}>
          <DesignationForm
            onSubmit={handleCreate}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  );
}