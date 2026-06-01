import SalaryStructureSection from "../../components/SalaryStructureSection";

export default function SalaryStructurePage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Salary Structure
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage earnings and deductions
          </p>
        </div>
      </div>

      <SalaryStructureSection />
    </div>
  );
}