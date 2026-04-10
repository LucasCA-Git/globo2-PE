import { Ilha } from "@/types/dashboard";
import EditorCard from "./EditorCard";

type Props = {
  ilhas: Ilha[];
};

export default function EditorsGrid({ ilhas }: Props) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-white">Ilhas em Atividade</h2>

      {ilhas.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-slate-950 p-8 text-center text-slate-400">
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
