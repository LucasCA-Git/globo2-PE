import { Summary } from "@/types/dashboard";

type Props = {
  summary: Summary;
};

const cards = (summary: Summary) => [
  {
    title: "Total de Ilhas",
    value: summary.totalIlhas,
    subtitle: "Estações cadastradas",
  },
  {
    title: "Ilhas Ativas",
    value: summary.ilhasAtivas,
    subtitle: "Editando agora",
  },
  {
    title: "Tempo Médio",
    value: `${summary.tempoMedioMin}min`,
    subtitle: "Por sessão",
  },
  {
    title: "Concluídos Hoje",
    value: summary.concluidosHoje,
    subtitle: "Projetos finalizados",
  },
];

export default function SummaryCards({ summary }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards(summary).map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-white/10 bg-slate-950 p-5 shadow-lg shadow-black/20"
        >
          <p className="text-sm text-slate-400">{card.title}</p>
          <h2 className="mt-3 text-4xl font-bold text-white">{card.value}</h2>
          <p className="mt-2 text-sm text-slate-500">{card.subtitle}</p>
        </div>
      ))}
    </section>
  );
}