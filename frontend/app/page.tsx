"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";
import TabsNav from "@/components/TabsNav";
import EditorsGrid from "@/components/EditorsGrid";
import AIPanel from "@/components/AIPanel";
import ChartsSection from "@/components/ChartsSection";
import { DashboardData } from "@/types/dashboard";

export default function HomePage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchDashboard() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://127.0.0.1:5000/dashboard");

      if (!response.ok) {
        throw new Error("Erro ao buscar dados do dashboard.");
      }

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
      <main className="min-h-screen bg-black px-4 py-6 md:px-8 flex items-center justify-center">
        <p className="text-white text-lg">Carregando dados do backend...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-black px-4 py-6 md:px-8 flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-lg">{error}</p>
        <button
          onClick={fetchDashboard}
          className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Tentar novamente
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-6 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header
          atualizadoEm={data.atualizadoEm}
          statusSistema={data.statusSistema}
        />

        <SummaryCards summary={data.summary} />

        <TabsNav />

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <EditorsGrid ilhas={data.ilhas} />
          <AIPanel ia={data.ia} />
        </section>

        <ChartsSection
          horasPorDia={data.horasPorDia}
          atividadePorHora={data.atividadePorHora}
        />
      </div>
    </main>
  );
}