export type Summary = {
  totalIlhas: number;
  ilhasAtivas: number;
  tempoMedioMin: number;
  concluidosHoje: number;
};

export type Ilha = {
  id: number;

  editor?: string;
  avatar?: string;

  ilha: string;

  // Vocabulário real emitido pelo backend (routes/dashboard_routes.py),
  // que apenas capitaliza o status vindo do agente ("ocupado" | "concluido").
  status: "Ocupado" | "Concluido";

  projeto: string;

  progresso: number;

  inicio: string;

  arquivoGb: number;

  previsaoRestanteMin: number;

  previsaoFim: string;

  editorTexto?: string;

  reporter?: string;

  carga?: number;

  regional?: string;
};

export type FilaEntrega = {
  id: number;
  editor: string;
  projeto: string;
  horario: string;
  restanteMin: number;
};

export type IAData = {
  fila: FilaEntrega[];
  precisaoModelo: number;
  dadosTreinamento: number;
};

export type ChartPoint = {
  label: string;
  valor: number;
};

export type DashboardData = {
  atualizadoEm: string;
  statusSistema: string;
  summary: Summary;
  ilhas: Ilha[];
  ia: IAData;
  horasPorDia: ChartPoint[];
  atividadePorHora: ChartPoint[];
};

export type ViewMode = "gerente" | "gestor" | "publico";