/** Dados mock da tela Início — esboço do dashboard (sem API). */

export interface HomeFinanceSnapshot {
  balance: number;
  incomeMonth: number;
  expenseMonth: number;
  currency: string;
}

export interface HomeStudySnapshot {
  streakDays: number;
  minutesToday: number;
  weeklyGoalMinutes: number;
  currentTrack: string;
  currentTopic: string;
  topicProgress: number;
}

export interface HomeTaskItem {
  id: string;
  title: string;
  dueLabel: string;
  priority: 'alta' | 'média' | 'baixa';
  project: string;
  done: boolean;
}

export interface HomeHabitItem {
  id: string;
  name: string;
  streakDays: number;
  doneToday: boolean;
}

export interface HomeGoalItem {
  id: string;
  title: string;
  domain: 'estudo' | 'finanças' | 'pessoal';
  progress: number;
  deadlineLabel: string;
}

export interface HomeDashboardMock {
  finance: HomeFinanceSnapshot;
  study: HomeStudySnapshot;
  tasks: HomeTaskItem[];
  habits: HomeHabitItem[];
  goals: HomeGoalItem[];
  focusNote: string;
}

export const HOME_DASHBOARD_MOCK: HomeDashboardMock = {
  finance: {
    balance: 4820.4,
    incomeMonth: 6200,
    expenseMonth: 2145.75,
    currency: 'BRL',
  },
  study: {
    streakDays: 12,
    minutesToday: 45,
    weeklyGoalMinutes: 300,
    currentTrack: 'Java + Spring',
    currentTopic: 'Clean Architecture — Application',
    topicProgress: 62,
  },
  tasks: [
    {
      id: 't1',
      title: 'Revisar endpoints de usuário no Swagger',
      dueLabel: 'Hoje · 18h',
      priority: 'alta',
      project: 'Orbit',
      done: false,
    },
    {
      id: 't2',
      title: 'Ler capítulo sobre transações JPA',
      dueLabel: 'Amanhã',
      priority: 'média',
      project: 'Estudos',
      done: false,
    },
    {
      id: 't3',
      title: 'Atualizar extrato da conta principal',
      dueLabel: 'Sex',
      priority: 'baixa',
      project: 'Finanças',
      done: true,
    },
  ],
  habits: [
    { id: 'h1', name: 'Estudar 45 min', streakDays: 12, doneToday: true },
    { id: 'h2', name: 'Registrar gastos do dia', streakDays: 5, doneToday: false },
    { id: 'h3', name: 'Caminhada 20 min', streakDays: 3, doneToday: false },
  ],
  goals: [
    {
      id: 'g1',
      title: 'Completar trilha Spring Security',
      domain: 'estudo',
      progress: 40,
      deadlineLabel: '30 dias',
    },
    {
      id: 'g2',
      title: 'Reserva de emergência R$ 10.000',
      domain: 'finanças',
      progress: 48,
      deadlineLabel: '6 meses',
    },
    {
      id: 'g3',
      title: 'Rotina estável de estudos',
      domain: 'pessoal',
      progress: 70,
      deadlineLabel: 'Contínua',
    },
  ],
  focusNote: 'Retomar o estudo com consistência — o Orbit existe para isso.',
};
