const tabs = ["Visão Geral", "Ilhas", "Analytics", "Histórico"];

type Props = {
  abaAtiva: string;
  onMudarAba: (aba: string) => void;
};

export default function TabsNav({ abaAtiva, onMudarAba }: Props) {
  return (
    <nav className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onMudarAba(tab)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            abaAtiva === tab
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