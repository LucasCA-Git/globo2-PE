"use client";

type HeaderProps = {
  atualizadoEm: string;
  statusSistema: string;
  onRefresh: () => void;
};

const toggleTheme = () => {
  const html = document.documentElement;

  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
  } else {
    html.classList.add("dark");
  }
}

export default function Header({ atualizadoEm, statusSistema, onRefresh }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 dark:border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Media Compose Dashboard</h1>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            {statusSistema}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Monitoramento e Inteligência para Ilhas de Edição
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-400">Atualizado: {atualizadoEm}</span>
        <button onClick={onRefresh}
          className="rounded-lg 
          border border-slate-200 dark:border-white/10 
        bg-white dark:bg-slate-900 
        text-slate-900 dark:text-white 
          px-4 py-2 text-sm font-medium 
          transition hover:bg-slate-100 dark:hover:bg-slate-800">
          Atualizar
        </button>
        <button className="rounded-lg 
          border border-slate-200 dark:border-white/10 
        bg-white dark:bg-slate-900 
        text-slate-900 dark:text-white 
          px-4 py-2 text-sm font-medium 
          transition hover:bg-slate-100 dark:hover:bg-slate-800">
          🔔
        </button>
        <button className="rounded-lg 
          border border-slate-200 dark:border-white/10 
        bg-white dark:bg-slate-900 
        text-slate-900 dark:text-white 
          px-4 py-2 text-sm font-medium 
          transition hover:bg-slate-100 dark:hover:bg-slate-800">
          ⚙️
        </button>
        <button
          className="rounded-lg 
            border border-slate-200 dark:border-white/10 
          bg-white dark:bg-slate-900 
          text-slate-900 dark:text-white 
            px-4 py-2 text-sm font-medium 
            transition hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={toggleTheme}>
          🌙 / ☀️
        </button>
      </div>
    </header>
  );
}