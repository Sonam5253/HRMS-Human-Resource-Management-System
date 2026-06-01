// src/components/RoundedSelect.jsx
import { useState, useRef, useEffect } from "react";

export default function RoundedSelect({
  value,
  onChange,
  options,
  placeholder = "Select",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // outside click close
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-auto min-w-[150px]">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full px-4 py-2 text-sm text-left
          rounded-xl border
          bg-white dark:bg-[#0F1419]
          border-gray-300 dark:border-white/10
          text-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition
        "
      >
        {value && value !== "All" ? value : placeholder}

      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full
            bg-white dark:bg-[#0F1419]
            border border-gray-200 dark:border-white/10
            rounded-xl shadow-xl
            overflow-hidden
          "
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="
                px-4 py-2 text-sm cursor-pointer
                hover:bg-indigo-50
                dark:hover:bg-indigo-500/10
                transition
              "
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
