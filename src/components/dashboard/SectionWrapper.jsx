import Card from "../../components/commons/Card";

export default function SectionWrapper({ title, right, children }) {
  return (
    <Card className="h-[340px] flex flex-col p-4  rounded-2xl">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-700">
          {title}
        </h3>
        {right}
      </div>

      {/* CONTENT (SCROLL ENABLED) */}
      <div className="flex-1 overflow-y-auto pr-1  hide-scrollbar no-scrollbar">
        {children}
      </div>

    </Card>
  );
}