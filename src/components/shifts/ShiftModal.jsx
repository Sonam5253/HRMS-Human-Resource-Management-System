import { useEffect, useState } from "react";
import Modal from "../commons/Modal";
import Button from "../commons/Button";

const emptyForm = {
  name: "",
  startTime: "",
  endTime: "",

  flexibleLunch: "",
  lunchWindowStart: "",
  lunchWindowEnd: "",
  lunchDuration: "",

  weekOff: {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  },

  overtimeEnabled: "",
  overtimeRegular: "",
  overtimeHoliday: "",
  overtimeNight: "",
  overtimeThresholdMinutes: "",
  overtimeApprovalRequired: "",

  gracePeriod: "",
  halfDayAfter: "",
  fullDayAfter: "",
  deductFromSalary: "",
};

export default function ShiftModal({ open, onClose, editingShift, onSubmit }) {
  const [form, setForm] = useState(emptyForm);

  // 🔥 Edit Mode Fill
  useEffect(() => {
    if (editingShift) {
      setForm({
        name: editingShift.name || "",
        startTime: editingShift.defaultShift?.startTime || "",
        endTime: editingShift.defaultShift?.endTime || "",

        flexibleLunch: String(editingShift.flexibleLunch ?? ""),
        lunchWindowStart: editingShift.lunchWindowStart || "",
        lunchWindowEnd: editingShift.lunchWindowEnd || "",
        lunchDuration: editingShift.lunchDuration || "",

        weekOff: editingShift.weekOff || emptyForm.weekOff,

        overtimeEnabled: String(editingShift.overtimeEnabled ?? ""),
        overtimeRegular: editingShift.overtimeRates?.regular || "",
        overtimeHoliday: editingShift.overtimeRates?.holiday || "",
        overtimeNight: editingShift.overtimeRates?.night || "",
        overtimeThresholdMinutes:
          editingShift.overtimeThresholdMinutes || "",
        overtimeApprovalRequired: String(
          editingShift.overtimeApprovalRequired ?? ""
        ),

        gracePeriod: editingShift.latePolicy?.gracePeriod || "",
        halfDayAfter: editingShift.latePolicy?.halfDayAfter || "",
        fullDayAfter: editingShift.latePolicy?.fullDayAfter || "",
        deductFromSalary: String(
          editingShift.latePolicy?.deductFromSalary ?? ""
        ),
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingShift, open]);

  if (!open) return null;

  return (
    <Modal
      title={editingShift ? "Edit Shift" : "Create Shift"}
      onClose={onClose}
      cardClassName="max-w-xl"
      actions={
        <>
          <Button text="Cancel" size="sm" variant="outline" onClick={onClose} />
          <Button
            text="Save"
            size="sm"
            variant="brand"
            onClick={() =>
              onSubmit({
                name: form.name,
                defaultShift: {
                  startTime: form.startTime,
                  endTime: form.endTime,
                },
                flexibleLunch: form.flexibleLunch === "true",
                lunchWindowStart: form.lunchWindowStart,
                lunchWindowEnd: form.lunchWindowEnd,
                lunchDuration: Number(form.lunchDuration),
                weekOff: form.weekOff,
                overtimeEnabled: form.overtimeEnabled === "true",
                overtimeRates: {
                  regular: Number(form.overtimeRegular),
                  holiday: Number(form.overtimeHoliday),
                  night: Number(form.overtimeNight),
                },
                overtimeThresholdMinutes: Number(
                  form.overtimeThresholdMinutes
                ),
                overtimeApprovalRequired:
                  form.overtimeApprovalRequired === "true",
                latePolicy: {
                  gracePeriod: Number(form.gracePeriod),
                  halfDayAfter: Number(form.halfDayAfter),
                  fullDayAfter: Number(form.fullDayAfter),
                  deductFromSalary:
                    form.deductFromSalary === "true",
                },
              })
            }
          />
        </>
      }
    >
      <div className="space-y-5 text-xs">

        {/* 🔹 BASIC */}
        <div>
          <p className="font-semibold text-slate-700 mb-2">
            Basic Info
          </p>

          <input
            placeholder="Shift Name (e.g. Morning Shift)"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full h-9 border rounded-xl px-3"
          />

          <div className="grid grid-cols-2 gap-2 mt-2">
            <input
              type="time"
              value={form.startTime}
              onChange={(e) =>
                setForm({ ...form, startTime: e.target.value })
              }
              className="h-9 border rounded-xl px-3"
            />
            <input
              type="time"
              value={form.endTime}
              onChange={(e) =>
                setForm({ ...form, endTime: e.target.value })
              }
              className="h-9 border rounded-xl px-3"
            />
          </div>
        </div>

        {/* 🔹 LUNCH */}
        <div>
          <p className="font-semibold text-slate-700 mb-2">
            Lunch Settings
          </p>

          <select
            value={form.flexibleLunch}
            onChange={(e) =>
              setForm({ ...form, flexibleLunch: e.target.value })
            }
            className="w-full h-9 border rounded-xl px-3"
          >
            <option value="">Flexible Lunch?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <input
              type="time"
              value={form.lunchWindowStart}
              onChange={(e) =>
                setForm({ ...form, lunchWindowStart: e.target.value })
              }
              className="h-9 border rounded-xl px-3"
            />
            <input
              type="time"
              value={form.lunchWindowEnd}
              onChange={(e) =>
                setForm({ ...form, lunchWindowEnd: e.target.value })
              }
              className="h-9 border rounded-xl px-3"
            />
            <input
              type="number"
              placeholder="Duration (min)"
              value={form.lunchDuration}
              onChange={(e) =>
                setForm({ ...form, lunchDuration: e.target.value })
              }
              className="h-9 border rounded-xl px-3"
            />
          </div>
        </div>

        {/* 🔹 WEEK OFF */}
        <div>
          <p className="font-semibold text-slate-700 mb-2">
            Weekly Off Days
          </p>

          <div className="flex flex-wrap gap-2">
            {Object.keys(form.weekOff).map((day) => (
              <button
                key={day}
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    weekOff: {
                      ...form.weekOff,
                      [day]: !form.weekOff[day],
                    },
                  })
                }
                className={`px-2 py-1 rounded border text-xs ${
                  form.weekOff[day]
                    ? "bg-violet-100 border-violet-400"
                    : "bg-white"
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 OVERTIME */}
        <div>
          <p className="font-semibold text-slate-700 mb-2">
            Overtime Settings
          </p>

          <select
            value={form.overtimeEnabled}
            onChange={(e) =>
              setForm({ ...form, overtimeEnabled: e.target.value })
            }
            className="w-full h-9 border rounded-xl px-3"
          >
            <option value="">Enable Overtime?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <input placeholder="Regular (1.5x)" value={form.overtimeRegular} onChange={(e)=>setForm({...form,overtimeRegular:e.target.value})} className="h-9 border rounded-xl px-3"/>
            <input placeholder="Holiday (2x)" value={form.overtimeHoliday} onChange={(e)=>setForm({...form,overtimeHoliday:e.target.value})} className="h-9 border rounded-xl px-3"/>
            <input placeholder="Night (2.5x)" value={form.overtimeNight} onChange={(e)=>setForm({...form,overtimeNight:e.target.value})} className="h-9 border rounded-xl px-3"/>
          </div>
        </div>

        {/* 🔹 LATE POLICY */}
        <div>
          <p className="font-semibold text-slate-700 mb-2">
            Late Policy
          </p>

          <input placeholder="Grace Time (min)" value={form.gracePeriod} onChange={(e)=>setForm({...form,gracePeriod:e.target.value})} className="h-9 border rounded-xl px-3 w-full"/>

          <p className="text-[10px] text-gray-400 mt-1">
            Allowed delay after shift start without penalty
          </p>
        </div>

      </div>
    </Modal>
  );
}