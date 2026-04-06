import { Ilha } from "@/types/dashboard";
import EditorCard from "./EditorCard";

type Props = {
  ilhas: Ilha[];
};

export default function EditorsGrid({ ilhas }: Props) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-white">Ilhas em Atividade</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        {ilhas.map((ilha) => (
          <EditorCard key={ilha.id} ilha={ilha} />
        ))}
      </div>
    </section>
  );
}