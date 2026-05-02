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
};

const buttonBase = `
  rounded-lg border
  border-slate-200 dark:border-white/10 
  bg-white dark:bg-[rgba(37,37,37,1)]
  text-[rgba(30,30,30,1)] dark:text-[rgba(227,227,233,1)] 
  px-4 py-2 text-sm font-medium 
  transition 
  hover:bg-[rgba(235,235,235,1)] 
  dark:hover:bg-[rgba(50,50,50,1)]
`;

const iconButton = `${buttonBase} px-3 py-2`;

export default function Header({ atualizadoEm, statusSistema, onRefresh }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 dark:border-white/10 pb-5 md:flex-row md:items-center md:justify-between">

      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[rgba(30,30,30,1)] dark:text-[rgba(240,240,245,1)]">
            Media Compose Dashboard
          </h1>

          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            {statusSistema}
          </span>
        </div>

        <p className="mt-1 text-sm text-[rgba(100,100,100,1)] dark:text-[rgba(160,160,170,1)]">
          Monitoramento e Inteligência para Ilhas de Edição
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-[rgba(140,140,140,1)] dark:text-[rgba(140,140,150,1)]">
          Atualizado: {atualizadoEm}
        </span>

        <button onClick={onRefresh} className={buttonBase}>
          Atualizar
        </button>

        <button className={iconButton}>
          🔔
        </button>

        <button className={iconButton}>
          ⚙️
        </button>

        <button className={buttonBase} onClick={toggleTheme}>
          🌙 / ☀️
        </button>
      </div>
    </header>
  );
}