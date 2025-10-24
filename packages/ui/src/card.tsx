export function Card(props: { className?: string; title?: string; children: React.ReactNode }) {
  const { className = '', title, children } = props;

  return (
    <div
      className={`relative border border-[#acacac] rounded-lg m-[10px] mt-4 p-3 pt-4 text-xs ${className}`}
    >
      <div className="absolute top-0 -translate-y-1/2 bg-white px-1">{title}</div>
      {children}
    </div>
  );
}

export default Card;
