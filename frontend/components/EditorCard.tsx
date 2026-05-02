import { Ilha } from "@/types/dashboard";

type Props = {
  ilha: Ilha;
};

export default function EditorCard({ ilha }: Props) {
  const ocupado = ilha.status === "Ocupado";

  return (
    <div
      className={`
        rounded-2xl border p-5 shadow-lg transition
        bg-white dark:bg-[#020617]
        border-[rgba(0,0,0,0.08)] dark:border-white/10
        ${ocupado ? "" : "dark:border-emerald-500/20"}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`
              relative flex h-11 w-11 shrink-0 items-center justify-center
              rounded-full text-sm font-bold
              text-white
              ${ocupado ? "bg-[rgba(50,50,50,1)]" : "bg-[rgba(200,200,200,0.6)] dark:bg-[rgba(50,50,50,0.5)]"}
            `}
          >
            {ocupado ? (
              ilha.avatar
            ) : (
              <span className="text-[rgba(120,120,120,1)] text-lg">?</span>
            )}

            <span
              className={`
                absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2
                border-white dark:border-[#020617]
                ${ocupado ? "bg-amber-400" : "bg-emerald-400"}
              `}
            />
          </div>

          <div className="min-w-0">
            <h3
              className={`
                truncate font-semibold
                ${ocupado
                  ? "text-slate-900 dark:text-[rgba(227,227,233,1)]"
                  : "text-slate-500 italic"}
              `}
            >
              {ocupado ? ilha.editor : "Aguardando editor"}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {ilha.ilha}
            </p>
          </div>
        </div>

        <span
          className={`
            shrink-0 rounded-full px-3 py-1 text-xs font-medium
            ${ocupado
              ? "bg-amber-500/15 text-amber-500"
              : "bg-emerald-500/15 text-emerald-500"}
          `}
        >
          {ilha.status}
        </span>
      </div>

      <div className="
        mt-5 rounded-xl p-4
        bg-[rgba(245,245,245,1)] dark:bg-[rgba(50,50,50,0.9)]
      ">
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Projeto Atual
        </p>

        <p className="
          mt-2 truncate text-sm font-medium
          text-slate-900 dark:text-[rgba(227,227,233,1)]
        ">
          {ilha.projeto}
        </p>
      </div>

      {ocupado && (
        <>
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Progresso
              </span>

              <span className="font-medium text-slate-900 dark:text-[rgba(227,227,233,1)]">
                {ilha.progresso}%
              </span>
            </div>

            <div className="h-2 w-full rounded-full bg-[rgba(220,220,220,1)] dark:bg-[rgba(60,60,60,1)]">
              <div
                className="h-2 rounded-full bg-cyan-400 transition-all"
                style={{ width: `${ilha.progresso}%` }}
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="
              rounded-xl border p-3
              border-[rgba(0,0,0,0.06)] dark:border-white/5
              bg-[rgba(245,245,245,1)] dark:bg-[rgba(50,50,50,0.9)]
            ">
              <p className="text-slate-500 dark:text-slate-400">Início</p>
              <p className="mt-1 font-medium text-slate-900 dark:text-[rgba(227,227,233,1)]">
                {ilha.inicio}
              </p>
            </div>

            <div className="
              rounded-xl border p-3
              border-[rgba(0,0,0,0.06)] dark:border-white/5
              bg-[rgba(245,245,245,1)] dark:bg-[rgba(50,50,50,0.9)]
            ">
              <p className="text-slate-500 dark:text-slate-400">Arquivo</p>
              <p className="mt-1 font-medium text-slate-900 dark:text-[rgba(227,227,233,1)]">
                {ilha.arquivoGb} GB
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <p className="text-sm text-cyan-600 dark:text-cyan-300">
              Previsão IA
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-[rgba(227,227,233,1)]">
              {ilha.previsaoRestanteMin}min restantes ({ilha.previsaoFim})
            </p>
          </div>
        </>
      )}
    </div>
  );
}