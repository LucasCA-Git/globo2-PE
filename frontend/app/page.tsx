import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";
import TabsNav from "@/components/TabsNav";
import EditorsGrid from "@/components/EditorsGrid";
import AIPanel from "@/components/AIPanel";
import ChartsSection from "@/components/ChartsSection";
import { dashboardData } from "@/data/mockData";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black px-4 py-6 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header
          atualizadoEm={dashboardData.atualizadoEm}
          statusSistema={dashboardData.statusSistema}
        />

        <SummaryCards summary={dashboardData.summary} />

        <TabsNav />

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <EditorsGrid ilhas={dashboardData.ilhas} />
          <AIPanel ia={dashboardData.ia} />
        </section>

        <ChartsSection
          horasPorDia={dashboardData.horasPorDia}
          atividadePorHora={dashboardData.atividadePorHora}
        />
      </div>
    </main>
  );
}