"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { ChartPoint } from "@/types/dashboard";

type Props = {
  horasPorDia: ChartPoint[];
  atividadePorHora: ChartPoint[];
};

export default function ChartsSection({
  horasPorDia,
  atividadePorHora,
}: Props) {
  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Horas Trabalhadas por Dia
        </h2>

        <div className="w-full min-w-0" style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <LineChart data={horasPorDia}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#38bdf8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Atividade por Hora
        </h2>

        <div className="w-full min-w-0" style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={atividadePorHora}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar
                dataKey="valor"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}