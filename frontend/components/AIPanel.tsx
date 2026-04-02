import { IAData } from "@/types/dashboard";

type Props = {
  ia: IAData;
};

export default function AIPanel({ ia }: Props) {
  return (
    <aside className="rounded-2xl border border-cyan-500/20 bg-slate-950 p-5 shadow-lg shadow-black/20">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Inteligência Artificial</h2>
        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
          Modelo Ativo
        </span>
      </div>

      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
        <p className="text-sm text-cyan-300">Próxima Entrega</p>
        <h3 className="mt-2 text-lg font-semibold text-white">{ia.proximaEntrega.editor}</h3>
        <p className="mt-1 text-sm text-slate-400">{ia.proximaEntrega.projeto}</p>
        <p className="mt-3 text-xl font-bold text-cyan-300">
          {ia.proximaEntrega.horario}
        </p>
        <p className="text-sm text-slate-400">
          {ia.proximaEntrega.restanteMin} minutos restantes
        </p>
      </div>

      <div className="mt-5">
        <h3 className="mb-3 text-sm font-medium text-slate-300">Fila de Entregas Previstas</h3>

        <div className="space-y-3">
          {ia.fila.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start justify-between rounded-xl border border-white/5 bg-slate-900/70 p-3"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  #{index + 1} {item.editor}
                </p>
                <p className="text-xs text-slate-400">{item.projeto}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-white">{item.horario}</p>
                <p className="text-xs text-slate-400">{item.restanteMin}min</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-xl border border-white/5 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">Precisão do Modelo</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">
            {ia.precisaoModelo}%
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">Dados de Treinamento</p>
          <p className="mt-1 text-2xl font-bold text-white">
            {ia.dadosTreinamento.toLocaleString("pt-BR")} sessões
          </p>
        </div>
      </div>
    </aside>
  );
}