export default function PageTitle({ title, right }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {right}
    </div>
  );
}
