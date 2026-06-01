import {
  FilePlus,
  FileText,
  LifeBuoy,
  Boxes,
  Download,
  Settings,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Card from "../commons/Card";
import Button from "../commons/Button";

export default function QuickActions() {
  const actions = [
    {
      label: "Apply Leave",
      icon: FilePlus,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      label: "View Payslip",
      icon: FileText,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "Support Ticket",
      icon: LifeBuoy,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      label: "Asset Request",
      icon: Boxes,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
  ];

  return (
    <SectionWrapper
    
      title={
        <div>
          <p className="text-sm font-semibold text-slate-700">
            Quick Actions
          </p>
          <p className="text-xs text-slate-400">
            Frequently used features
          </p>
        </div>
      }
    >
      {/* ACTION GRID */}
      <div className="grid grid-cols-4 gap-3">

        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card
              key={index}
              className={`${item.bg} p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white/60 ${item.text}`}>
                <Icon size={18} />
              </div>

              <p className={`text-xs mt-2 font-medium ${item.text}`}>
                {item.label}
              </p>
            </Card>
          );
        })}

      </div>

      {/* DIVIDER */}
      <div className="my-4 border-t" />

      {/* BOTTOM BUTTONS */}
      <div className="grid grid-cols-2 gap-3">

        <Button
          text="Download Docs"
          variant="outline"
          className="bg-slate-100 text-slate-600"
        >
          <Download size={16} />
        </Button>

        <Button
          text="Settings"
          variant="outline"
          className="bg-slate-100 text-slate-600"
        >
          <Settings size={16} />
        </Button>

      </div>
    </SectionWrapper>
  );
}