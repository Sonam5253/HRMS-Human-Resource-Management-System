export default function EmptyState({ title, desc }) {
  return (
    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm">{desc}</p>
    </div>
  );
}
