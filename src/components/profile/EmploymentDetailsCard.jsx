import Card from "../commons/Card";
import {
  Briefcase,
  Building,
  Calendar,
  UserCheck,
  DollarSign,
  Users,
  Edit,
} from "lucide-react";

export default function EmploymentDetailsCard() {
  return (
    <Card className="p-5 rounded-2xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Employment Details
        </h3>

        <button
          title="Edit Employment"
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-green-600 transition"
        >
          <Edit size={16} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Designation */}
        <div className="flex gap-3 border-b pb-3">
          <Briefcase size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Designation</p>
            <p className="text-sm font-medium">
              Senior Software Engineer
            </p>
          </div>
        </div>

        {/* Department */}
        <div className="flex gap-3 border-b pb-3">
          <Building size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Department</p>
            <p className="text-sm font-medium">Engineering</p>
          </div>
        </div>

        {/* Joining Date */}
        <div className="flex gap-3 border-b pb-3">
          <Calendar size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Joining Date</p>
            <p className="text-sm font-medium">January 15, 2023</p>
          </div>
        </div>

        {/* Employee Type */}
        <div className="flex gap-3 border-b pb-3">
          <UserCheck size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Employee Type</p>
            <p className="text-sm font-medium">
              Full-time Permanent
            </p>
          </div>
        </div>

        {/* Salary Grade */}
        <div className="flex gap-3 border-b pb-3">
          <DollarSign size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Salary Grade</p>
            <p className="text-sm font-medium">
              Grade 7 (Band C)
            </p>
          </div>
        </div>

        {/* Reporting Manager */}
        <div className="flex gap-3">
          <Users size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Reporting Manager</p>
            <p className="text-sm font-medium">
              Sarah Williams
            </p>
          </div>
        </div>

      </div>
    </Card>
  );
}