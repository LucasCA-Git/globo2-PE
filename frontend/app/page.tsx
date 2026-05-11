"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";
import TabsNav from "@/components/TabsNav";
import FilterBar from "@/components/FilterBar";
import EditorsGrid from "@/components/EditorsGrid";
import AIPanel from "@/components/AIPanel";
import ChartsSection from "@/components/ChartsSection";
import { DashboardData } from "@/types/dashboard";

export default function HomePage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [editorFilter, setEditorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  async function fetchDashboard() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://127.0.0.1:5000/dashboard");
      if (!response.ok) throw new Error("Erro ao buscar dados do dashboard.");
      const result: DashboardData = await response.json();
      setData(result);
    } catch (err) {
      setError("Não foi possível carregar os dados do backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-8 flex items-center justify-center">
        <p className="text-slate-700 dark:text-slate-200 text-lg">Carregando dados do backend...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-8 flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-lg">{error}</p>
        <button
          onClick={fetchDashboard}
          className="
            rounded-xl border border-slate-200/80 dark:border-white/10
            bg-white/90 dark:bg-slate-900/70
            px-4 py-2 text-sm font-medium
            text-slate-700 dark:text-slate-200
            shadow-sm backdrop-blur transition-all duration-200
            hover:bg-slate-50 hover:text-slate-900
            dark:hover:bg-slate-800/80 dark:hover:text-white
          "
        >
          Tentar novamente
        </button>
      </main>
    );
  }

  const ilhasFiltradas = data.ilhas.filter((ilha) => {
    const matchSearch = ilha.projeto.toLowerCase().includes(search.toLowerCase());
    const matchEditor = editorFilter ? ilha.editor === editorFilter : true;
    const matchStatus = statusFilter ? ilha.status === statusFilter : true;
    return matchSearch && matchEditor && matchStatus;
  });

  const showIlhas = activeTab === 0 || activeTab === 1;
  const showCharts = activeTab === 0 || activeTab === 2;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header
          atualizadoEm={data.atualizadoEm}
          statusSistema={data.statusSistema}
          onRefresh={fetchDashboard}
        />

        <SummaryCards summary={data.summary} />

        <TabsNav active={activeTab} onChange={setActiveTab} />

        {showIlhas && (
          <FilterBar
            ilhas={data.ilhas}
            search={search}
            onSearch={setSearch}
            editorFilter={editorFilter}
            onEditorFilter={setEditorFilter}
            statusFilter={statusFilter}
            onStatusFilter={setStatusFilter}
          />
        )}

        {showIlhas && (
          <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
            <EditorsGrid ilhas={ilhasFiltradas} />
            <AIPanel ia={data.ia} />
          </section>
        )}

        {showCharts && (
          <ChartsSection
            horasPorDia={data.horasPorDia}
            atividadePorHora={data.atividadePorHora}
          />
        )}

        {activeTab === 3 && (
          <div className="rounded-2xl border border-white/10 bg-slate-950 p-8 text-center text-slate-400">
            Histórico em desenvolvimento
          </div>
        )}
      </div>
    </main>
  );
}
