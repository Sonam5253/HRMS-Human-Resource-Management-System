import Card from "../commons/Card";
import {
  Phone,
  Home,
  Heart,
  Shield,
  Edit,
} from "lucide-react";

export default function ContactEmergencyCard() {
  return (
    <Card className="p-5 rounded-2xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Contact & Emergency Info
        </h3>

        <button
          title="Edit Contact Info"
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-green-600 transition"
        >
          <Edit size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">

        {/* Emergency Contact */}
        <div className="flex gap-3 border-b pb-3">
          <Phone size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Emergency Contact</p>
            <p className="text-sm font-medium">
              Jane Johnson (Mother)
            </p>
            <p className="text-xs text-slate-400">
              +1 (555) 987-6543
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex gap-3 border-b pb-3">
          <Home size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Emergency Address</p>
            <p className="text-sm font-medium">
              456 Family Ave, San Francisco, CA
            </p>
          </div>
        </div>

        {/* Medical */}
        <div className="flex gap-3 border-b pb-3">
          <Heart size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Medical Conditions</p>
            <p className="text-sm font-medium">None</p>
          </div>
        </div>

        {/* Insurance */}
        <div className="flex gap-3">
          <Shield size={16} className="text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500">Insurance Provider</p>
            <p className="text-sm font-medium">
              HealthGuard Inc. (Policy #HG-789012)
            </p>
          </div>
        </div>

      </div>
    </Card>
  );
}