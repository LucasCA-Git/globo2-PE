import { Ilha } from "@/types/dashboard";

type Props = {
  ilha: Ilha;
};

export default function EditorCard({ ilha }: Props) {
  const ocupado = ilha.status === "Ocupado";

  return (
    <div className={`rounded-2xl border bg-slate-950 p-5 shadow-lg shadow-black/20 transition ${ocupado ? "border-white/10" : "border-emerald-500/20"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${ocupado ? "bg-slate-800" : "bg-emerald-900/40"}`}>
            {ilha.avatar}
            <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 ${ocupado ? "bg-amber-400" : "bg-emerald-400"}`} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white">{ilha.editor}</h3>
            <p className="text-sm text-slate-400">{ilha.ilha}</p>
          </div>
        </div>

        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${ocupado ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"}`}>
          {ilha.status}
        </span>
      </div>

      <div className="mt-5 rounded-xl bg-slate-900/70 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">Projeto Atual</p>
        <p className="mt-2 truncate text-sm font-medium text-white">{ilha.projeto}</p>
      </div>

      {ocupado && (
        <>
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-400">Progresso</span>
              <span className="font-medium text-white">{ilha.progresso}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-cyan-400 transition-all" style={{ width: `${ilha.progresso}%` }} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-white/5 bg-slate-900/60 p-3">
              <p className="text-slate-500">Início</p>
              <p className="mt-1 font-medium text-white">{ilha.inicio}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-slate-900/60 p-3">
              <p className="text-slate-500">Arquivo</p>
              <p className="mt-1 font-medium text-white">{ilha.arquivoGb} GB</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <p className="text-sm text-cyan-300">Previsão IA</p>
            <p className="mt-1 text-sm font-semibold text-white">
              {ilha.previsaoRestanteMin}min restantes ({ilha.previsaoFim})
            </p>
          </div>
        </>
      )}
    </div>
  );
}
