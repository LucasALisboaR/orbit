import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBookOpen,
  lucideCheck,
  lucideCircleDashed,
  lucideFlame,
  lucideListTodo,
  lucidePiggyBank,
  lucideSparkles,
  lucideTarget,
  lucideWallet,
} from '@ng-icons/lucide';
import { HlmBadge } from '@spartan-ng/helm/badge';
import {
  HlmCard,
  HlmCardContent,
  HlmCardDescription,
  HlmCardHeader,
  HlmCardTitle,
} from '@spartan-ng/helm/card';
import { AuthService } from '../../../../core/auth/auth.service';
import {
  HOME_DASHBOARD_MOCK,
  HomeGoalItem,
  HomeHabitItem,
  HomeTaskItem,
} from './home.mock';

@Component({
  selector: 'app-home',
  providers: [
    provideIcons({
      lucideWallet,
      lucidePiggyBank,
      lucideBookOpen,
      lucideListTodo,
      lucideFlame,
      lucideTarget,
      lucideCheck,
      lucideCircleDashed,
      lucideSparkles,
    }),
  ],
  imports: [
    CurrencyPipe,
    NgClass,
    NgIcon,
    HlmBadge,
    HlmCard,
    HlmCardHeader,
    HlmCardTitle,
    HlmCardDescription,
    HlmCardContent,
  ],
  templateUrl: './home.html',
})
export class Home {
  protected readonly auth = inject(AuthService);

  private readonly dashboard = signal(HOME_DASHBOARD_MOCK);

  protected readonly finance = computed(() => this.dashboard().finance);
  protected readonly study = computed(() => this.dashboard().study);
  protected readonly tasks = computed(() => this.dashboard().tasks);
  protected readonly habits = computed(() => this.dashboard().habits);
  protected readonly goals = computed(() => this.dashboard().goals);
  protected readonly focusNote = computed(() => this.dashboard().focusNote);

  protected readonly studyDayPercent = computed(() => {
    const s = this.study();
    const dailyGoal = Math.max(1, Math.round(s.weeklyGoalMinutes / 7));
    return Math.min(100, Math.round((s.minutesToday / dailyGoal) * 100));
  });

  protected readonly greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  });

  protected readonly openTasksCount = computed(
    () => this.tasks().filter((task) => !task.done).length,
  );

  protected readonly habitsDoneCount = computed(
    () => this.habits().filter((habit) => habit.doneToday).length,
  );

  protected toggleHabit(habit: HomeHabitItem): void {
    this.dashboard.update((data) => ({
      ...data,
      habits: data.habits.map((item) =>
        item.id === habit.id ? { ...item, doneToday: !item.doneToday } : item,
      ),
    }));
  }

  protected toggleTask(task: HomeTaskItem): void {
    this.dashboard.update((data) => ({
      ...data,
      tasks: data.tasks.map((item) =>
        item.id === task.id ? { ...item, done: !item.done } : item,
      ),
    }));
  }

  protected priorityVariant(
    priority: HomeTaskItem['priority'],
  ): 'destructive' | 'default' | 'secondary' {
    if (priority === 'alta') return 'destructive';
    if (priority === 'média') return 'default';
    return 'secondary';
  }

  protected domainLabel(domain: HomeGoalItem['domain']): string {
    if (domain === 'estudo') return 'Estudo';
    if (domain === 'finanças') return 'Finanças';
    return 'Pessoal';
  }
}
