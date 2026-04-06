"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";
import TabsNav from "@/components/TabsNav";
import EditorsGrid from "@/components/EditorsGrid";
import AIPanel from "@/components/AIPanel";
import ChartsSection from "@/components/ChartsSection";
import { dashboardData } from "@/data/mockData";

export default function HomePage() {
  const [atualizadoEm, setAtualizadoEm] = useState(dashboardData.atualizadoEm);
  const [abaAtiva, setAbaAtiva] = useState("Visão Geral");
  const [notificacoes, setNotificacoes] = useState(false);
  const [configAberto, setConfigAberto] = useState(false);

  function handleAtualizar() {
    const agora = new Date();
    setAtualizadoEm(
      agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    );
  }

  const abas: Record<string, React.ReactNode> = {
    "Visão Geral": (
      <>
        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <EditorsGrid ilhas={dashboardData.ilhas} />
          <AIPanel ia={dashboardData.ia} />
        </section>
        <ChartsSection
          horasPorDia={dashboardData.horasPorDia}
          atividadePorHora={dashboardData.atividadePorHora}
        />
      </>
    ),
    "Ilhas": (
      <EditorsGrid ilhas={dashboardData.ilhas} />
    ),
    "Analytics": (
      <ChartsSection
        horasPorDia={dashboardData.horasPorDia}
        atividadePorHora={dashboardData.atividadePorHora}
      />
    ),
    "Histórico": (
      <div className="rounded-2xl border border-white/10 bg-slate-950 p-8 text-center text-slate-400">
        Histórico de sessões em desenvolvimento.
      </div>
    ),
  };

  return (
    <main className="min-h-screen bg-black px-4 py-6 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header
          atualizadoEm={atualizadoEm}
          statusSistema={dashboardData.statusSistema}
          onAtualizar={handleAtualizar}
          notificacoes={notificacoes}
          onToggleNotificacoes={() => setNotificacoes((v) => !v)}
          onToggleConfig={() => setConfigAberto((v) => !v)}
        />

        {notificacoes && (
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm text-cyan-300">
            🔔 Notificações ativadas — você será alertado sobre entregas e ilhas ociosas.
          </div>
        )}

        {configAberto && (
          <div className="rounded-xl border border-white/10 bg-slate-950 p-5 text-sm text-slate-300">
            <p className="mb-3 font-semibold text-white">⚙️ Configurações</p>
            <p className="text-slate-400">Painel de configurações em desenvolvimento.</p>
          </div>
        )}

        <SummaryCards summary={dashboardData.summary} />

        <TabsNav abaAtiva={abaAtiva} onMudarAba={setAbaAtiva} />

        {abas[abaAtiva]}
      </div>
    </main>
  );
}