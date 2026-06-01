export default function Avatar({ letter, size = "md" }) {
  const sizes = {
  sm: "w-7 h-7 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-12 h-12 text-lg",
};

  return (
    <div
      className={`
        ${sizes[size]}
        rounded-full bg-indigo-600 text-white
        flex items-center justify-center font-bold
      `}
    >
      {letter}
    </div>
  );
}
