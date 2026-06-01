// Badge.jsx
const variants = {
  success: "bg-green-100 text-green-700 dark:bg-green-900/30",
  warning: "bg-orange-100 text-orange-700 dark:bg-orange-900/30",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/30",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30",
};

export default function Badge({ text, variant = "info" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-medium ${variants[variant]}`}
    >
      {text}
    </span>
  );
}