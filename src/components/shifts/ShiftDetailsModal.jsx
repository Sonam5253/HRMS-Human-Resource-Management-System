import Modal from "../commons/Modal";

export default function ShiftDetailsModal({ data, onClose }) {
  if (!data) return null;

  const shiftData = data.shift;
  const shift = Object.values(shiftData?.shifts || {})[0];
  const employees = data.assignedEmployees || [];

  return (
    <Modal title="Shift Details" onClose={onClose}>
      <div className="space-y-4 text-xs">
        <div>
          <p className="text-slate-400">Name</p>
          <p className="font-medium text-slate-800">{shiftData?.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400">Time</p>
            <p className="text-slate-700">
              {shift?.startTime} - {shift?.endTime}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Lunch</p>
            <p className="text-slate-700">
              {shiftData?.lunchStartTime} - {shiftData?.lunchEndTime}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-slate-400">
            Employees ({data.totalEmployees})
          </p>

          <div className="space-y-2">
            {employees.length > 0 ? (
              employees.map((emp) => (
                <div
                  key={emp._id}
                  className="rounded-xl border border-slate-200 p-3 hover:bg-slate-50"
                >
                  <p className="font-medium text-slate-800">
                    {emp.fullName}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    {emp.email}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-slate-200 p-3 text-[11px] text-slate-500">
                No employee assigned
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}