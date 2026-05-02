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
          className="
            rounded-2xl border p-5 shadow-lg transition

            border-[rgba(0,0,0,0.08)] dark:border-white/10
            bg-[rgba(255,255,255,1)] dark:bg-[#020617]
          "
        >
          <p className="
            text-sm
            text-[rgba(120,120,120,1)]
          ">
            {card.title}
          </p>

          <h2 className="
            mt-3 text-4xl font-bold
            text-[rgba(30,30,30,1)] 
            dark:text-[rgba(227,227,233,1)]
          ">
            {card.value}
          </h2>

          <p className="
            mt-2 text-sm
            text-[rgba(140,140,140,1)]
          ">
            {card.subtitle}
          </p>
        </div>
      ))}
    </section>
  );
}