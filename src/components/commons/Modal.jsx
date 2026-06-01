import Card from "./Card";

export default function Modal({
  title,
  children,
  onClose,
  actions,
  cardClassName = "max-w-lg",
  bodyClassName = "px-5 py-4 text-sm",
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-3"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Card
        className={`
          w-full
          rounded-2xl
          bg-white
          shadow-2xl
          border border-slate-200
          overflow-hidden
          flex flex-col
          ${cardClassName}
        `}
        onClick={(e) => e.stopPropagation()}
      >

        {/* 🔷 Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition"
          >
            ✕
          </button>
        </div>

        {/* 🔷 Body */}
        <div className={`flex-1 ${bodyClassName}`}>
          {children}
        </div>

        {/* 🔷 Footer */}
        {actions && (
          <div className="flex justify-end gap-2 px-5 py-4 border-t border-slate-100 bg-slate-50">
            {actions}
          </div>
        )}

      </Card>
    </div>
  );
}