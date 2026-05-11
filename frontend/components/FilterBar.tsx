"use client";

import { Ilha } from "@/types/dashboard";

type Props = {
  ilhas: Ilha[];
  search: string;
  onSearch: (v: string) => void;
  editorFilter: string;
  onEditorFilter: (v: string) => void;
  statusFilter: string;
  onStatusFilter: (v: string) => void;
};

export default function FilterBar({
  ilhas,
  search,
  onSearch,
  editorFilter,
  onEditorFilter,
  statusFilter,
  onStatusFilter,
}: Props) {
  const editors = Array.from(new Set(ilhas.map((i) => i.editor)));

  const inputStyle = `
    h-10 rounded-lg border px-3 text-sm outline-none transition sm:px-4
    border-[rgba(0,0,0,0.1)] dark:border-white/10
    bg-[rgba(255,255,255,1)] dark:bg-[rgba(37,37,37,1)]
    text-[rgba(30,30,30,1)] dark:text-[rgba(227,227,233,1)]
    placeholder-[rgba(140,140,140,1)]
    focus:border-cyan-500/50
  `;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
      <input
        type="text"
        placeholder="Buscar projeto..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className={`w-full md:min-w-[220px] md:flex-1 ${inputStyle}`}
      />

      <select
        value={editorFilter}
        onChange={(e) => onEditorFilter(e.target.value)}
        className={`w-full md:min-w-[190px] md:w-auto ${inputStyle}`}
      >
        <option value="">Todos os editores</option>
        {editors.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) => onStatusFilter(e.target.value)}
        className={`w-full md:min-w-[170px] md:w-auto ${inputStyle}`}
      >
        <option value="">Todos os status</option>
        <option value="Ocupado">Ocupado</option>
        <option value="Livre">Livre</option>
      </select>
    </div>
  );
}
