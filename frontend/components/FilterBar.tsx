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

  return (
    <div className="flex flex-wrap gap-3">
      <input
        type="text"
        placeholder="Buscar projeto..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 min-w-[180px] rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500/50"
      />

      <select
        value={editorFilter}
        onChange={(e) => onEditorFilter(e.target.value)}
        className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
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
        className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
      >
        <option value="">Todos os status</option>
        <option value="Ocupado">Ocupado</option>
        <option value="Livre">Livre</option>
      </select>
    </div>
  );
}
