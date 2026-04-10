const tabs = ["Visão Geral", "Ilhas", "Analytics", "Histórico"];

export default function TabsNav() {
  return (
    <nav className="flex flex-wrap gap-2">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            index === 0
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