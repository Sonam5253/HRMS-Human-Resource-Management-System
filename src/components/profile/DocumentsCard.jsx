import Card from "../commons/Card";
import {
  FileText,
  IdCard,
  FileSpreadsheet,
  GraduationCap,
  Download,
  Upload,
  Folder,
} from "lucide-react";

export default function DocumentsCard() {
  const docs = [
    {
      title: "Employment Contract",
      info: "PDF • 2.4 MB • Signed Jan 15, 2023",
      icon: <FileText size={16} />,
      bg: "bg-blue-100 text-blue-600",
    },
    {
      title: "Identity Card",
      info: "PDF • 1.1 MB • Issued Jan 15, 2023",
      icon: <IdCard size={16} />,
      bg: "bg-green-100 text-green-600",
    },
    {
      title: "Tax Forms (W-4)",
      info: "PDF • 1.8 MB • Updated Mar 10, 2024",
      icon: <FileSpreadsheet size={16} />,
      bg: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Education Certificates",
      info: "ZIP • 5.2 MB • Uploaded Feb 28, 2023",
      icon: <GraduationCap size={16} />,
      bg: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <Card className="p-5 rounded-2xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Documents & Attachments
        </h3>

        <button className="flex items-center gap-1 text-green-600 text-sm font-medium">
          <Upload size={16} />
          Upload
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">

        {docs.map((doc, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl border bg-slate-50"
          >
            <div className="flex items-center gap-3">
              
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${doc.bg}`}>
                {doc.icon}
              </div>

              <div>
                <p className="text-sm font-medium text-slate-900">
                  {doc.title}
                </p>
                <p className="text-xs text-slate-500">
                  {doc.info}
                </p>
              </div>
            </div>

            <Download size={16} className="text-slate-400 cursor-pointer hover:text-green-600" />
          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="mt-4">
        <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700">
          <Folder size={16} />
          View All Documents (12)
        </button>
      </div>

    </Card>
  );
}