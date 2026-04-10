const tabs = ["Visão Geral", "Ilhas", "Analytics", "Histórico"];

type Props = {
  active: number;
  onChange: (index: number) => void;
};

export default function TabsNav({ active, onChange }: Props) {
  return (
    <nav className="flex flex-wrap gap-2">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => onChange(index)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            active === index
              ? "bg-white text-slate-950"
              : "border border-white/10 bg-slate-950 text-slate-300 hover:bg-slate-900"
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
