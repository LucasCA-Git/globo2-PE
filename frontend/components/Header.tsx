type HeaderProps = {
  atualizadoEm: string;
  statusSistema: string;
  onAtualizar: () => void;
  notificacoes: boolean;
  onToggleNotificacoes: () => void;
  onToggleConfig: () => void;
};

export default function Header({
  atualizadoEm,
  statusSistema,
  onAtualizar,
  notificacoes,
  onToggleNotificacoes,
  onToggleConfig,
}: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">Media Compose Dashboard</h1>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            {statusSistema}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-400">
          Monitoramento e Inteligência para Ilhas de Edição
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-400">Atualizado: {atualizadoEm}</span>
        <button
          onClick={onAtualizar}
          className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-500/40 hover:bg-slate-800 active:scale-95"
        >
          Atualizar
        </button>
        <button
          onClick={onToggleNotificacoes}
          title={notificacoes ? "Desativar notificações" : "Ativar notificações"}
          className={`rounded-lg border px-3 py-2 transition hover:bg-slate-800 active:scale-95 ${
            notificacoes
              ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
              : "border-white/10 bg-slate-900 text-white"
          }`}
        >
          🔔
        </button>
        <button
          onClick={onToggleConfig}
          className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white transition hover:bg-slate-800 active:scale-95"
        >
          ⚙️
        </button>
      </div>
    </header>
  );
}