import { Ilha } from "@/types/dashboard";
import EditorCard from "./EditorCard";

type Props = {
  ilhas: Ilha[];
};

export default function EditorsGrid({ ilhas }: Props) {
  return (
    <section>
      <h2 className="
        mb-4 text-xl font-semibold
        text-[rgba(30,30,30,1)] 
        dark:text-[rgba(227,227,233,1)]
      ">
        Ilhas em Atividade
      </h2>

      {ilhas.length === 0 ? (
        <div className="
          rounded-2xl border p-8 text-center
          border-[rgba(0,0,0,0.08)] dark:border-white/10
          bg-[rgba(255,255,255,1)] dark:bg-[#020617]
          text-[rgba(120,120,120,1)]
        ">
          Nenhuma ilha encontrada para os filtros selecionados.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {ilhas.map((ilha) => (
            <EditorCard key={ilha.id} ilha={ilha} />
          ))}
        </div>
      )}
    </section>
  );
}