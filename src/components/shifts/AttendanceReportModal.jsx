import Modal from "../commons/Modal";

export default function AttendanceReportModal({ data, onClose }) {
  if (!data) return null;

  return (
    <Modal title="Attendance Report" onClose={onClose}>
      <div className="space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-slate-50 p-2">
            <p className="text-slate-400">Employees</p>
            <p className="text-sm font-semibold">{data.summary?.totalEmployees}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-2">
            <p className="text-slate-400">Late %</p>
            <p className="text-sm font-semibold">{data.summary?.overallLatePercentage}%</p>
          </div>
        </div>
        <div className="space-y-2">
          {data.data?.map((item, index) => (
            <div key={index} className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-800">{item.employee?.name}</p>
                <span className="text-[11px] text-slate-500">
                  {item.attendance?.attendancePercentage}%
                </span>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-slate-500">
                <div>Present: {item.attendance?.presentDays}</div>
                <div>Absent: {item.attendance?.absentDays}</div>
                <div>Late: {item.attendance?.lateDays}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}