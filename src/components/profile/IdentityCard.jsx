// components/profile/IdentityCard.jsx

import Card from "../commons/Card";
import { Building, Download } from "lucide-react";

export default function IdentityCard() {
  return (
    <Card className="p-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">

      {/* TOP */}
      <div className="flex justify-between items-start">

        <div>
          <h3 className="text-lg font-semibold">
            Company Identity Card
          </h3>

          <p className="text-sm text-slate-300">
            Valid until: Dec 31, 2025
          </p>
        </div>

        {/* Photo Placeholder */}
        <div className="w-20 h-20 rounded-lg bg-slate-400/30 backdrop-blur-sm" />
      </div>

      {/* COMPANY */}
      <div className="flex items-center gap-3 mt-5">

        <div className="bg-green-500 p-2 rounded-full">
          <Building size={16} />
        </div>

        <div>
          <p className="text-xs text-slate-300">Company</p>
          <p className="font-medium">
            TechCorp Solutions Inc.
          </p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 mt-5 text-sm">

        <div>
          <p className="text-slate-400 text-xs">Employee ID</p>
          <p className="font-medium">EMP-2023-0456</p>
        </div>

        <div>
          <p className="text-slate-400 text-xs">Department</p>
          <p className="font-medium">Engineering</p>
        </div>

        <div>
          <p className="text-slate-400 text-xs">Designation</p>
          <p className="font-medium">
            Senior Software Engineer
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-xs">Blood Group</p>
          <p className="font-medium">O+</p>
        </div>

      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-600 text-sm">

        <p className="text-slate-300">
          Issued on: Jan 15, 2023
        </p>

        <button className="flex items-center gap-2 text-green-400 font-medium">
          <Download size={16} />
          Download Card
        </button>

      </div>

    </Card>
  );
}