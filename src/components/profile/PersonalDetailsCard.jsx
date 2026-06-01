import Card from "../commons/Card";
import { User, Calendar, Phone, Mail,Edit, MapPin } from "lucide-react";

export default function PersonalDetailsCard() {
  return (
    <Card className="p-5 rounded-2xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Personal Details
        </h3>

        <button
  title="Edit Profile"
  className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-green-600 transition"
>
  <Edit size={16} />
</button>
      </div>

      {/* ✅ GRID START */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Name */}
        <div className="flex items-start gap-3 border-b pb-3">
          <User size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Full Name</p>
            <p className="text-sm font-medium">Alex Johnson</p>
          </div>
        </div>

        {/* DOB */}
        <div className="flex items-start gap-3 border-b pb-3">
          <Calendar size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Date of Birth</p>
            <p className="text-sm font-medium">May 15, 1990</p>
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-start gap-3 border-b pb-3">
          <User size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Gender</p>
            <p className="text-sm font-medium">Male</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3 border-b pb-3">
          <Phone size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Phone Number</p>
            <p className="text-sm font-medium">+1 (555) 123-4567</p>
          </div>
        </div>

        {/* Address (full width) */}
        <div className="flex items-start gap-3 border-b pb-3 lg:col-span-2">
          <MapPin size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Address</p>
            <p className="text-sm font-medium">
              123 Tech Street, San Francisco, CA 94107
            </p>
          </div>
        </div>

        {/* Email (full width) */}
        <div className="flex items-start gap-3 lg:col-span-2">
          <Mail size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Email Address</p>
            <p className="text-sm font-medium">
              alex.johnson@techcorp.com
            </p>
          </div>
        </div>

      </div>
    </Card>
  );
}