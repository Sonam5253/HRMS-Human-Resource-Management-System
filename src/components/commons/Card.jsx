// Card.jsx
export default function Card({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`rounded-xl border ${className}`}
    >
      {children}
    </div>
  );
}