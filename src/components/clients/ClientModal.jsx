import { User, Mail, Phone, X } from "lucide-react";

export default function ClientModal({
  open,
  onClose,
  form,
  handleChange,
  onSubmit,
  isEdit,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {isEdit ? "Update Client" : "Add Client"}
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Enter client details
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3 px-4 py-3">
          <Input
            icon={<User size={15} />}
            label="Client Name"
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter client name or company name"
          />

          <Input
            icon={<Mail size={15} />}
            label="Email"
            required
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <Input
            icon={<Phone size={15} />}
            label="Phone Number"
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        <div className="flex gap-2 border-t border-slate-100 px-4 py-3">
          <button
            onClick={onClose}
            className="h-9 flex-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="h-9 flex-1 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-medium text-white"
          >
            {isEdit ? "Update Client" : "Save Client"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ icon, label, required = false, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-slate-600">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          {...props}
          className="h-9 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-xs outline-none transition focus:border-violet-400"
        />
      </div>
    </div>
  );
}