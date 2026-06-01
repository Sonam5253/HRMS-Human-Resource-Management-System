import Modal from "./Modal";

export default function DeleteConfirm({
  open,
  onClose,
  onConfirm,
  title = "Delete Project?",
  message = "Are you sure you want to delete this project? This action cannot be undone.",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl">
        <h3 className="text-base font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {message}
        </p>

        <div className="mt-5 flex gap-2">
          <button
            onClick={onClose}
            className="h-10 flex-1 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="h-10 flex-1 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}