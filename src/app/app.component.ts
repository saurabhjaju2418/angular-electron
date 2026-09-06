import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  readonly max = signal(10);
  readonly current = signal(0);
  readonly remaining = computed(() => Math.max(0, this.maxVal() - this.current()));
  readonly progress = computed(() => Math.min(100, (this.currentVal() / this.maxVal()) * 100));
  readonly isFinished = computed(() => this.currentVal() >= this.maxVal());

  private timerId?: ReturnType<typeof setInterval>;

  updateMax(value: string): void {
    const seconds = Number(value);
    this.max.set(Number.isFinite(seconds) && seconds > 0 ? seconds : 0.1);
    this.reset();
  }

  start(): void {
    this.clearTimer();
    this.timerId = setInterval(() => {
      const next = Math.min(this.maxVal(), this.current() + 0.1);
      this.current.set(Number(next.toFixed(1)));
      if (this.isFinished()) this.clearTimer();
    }, 100);
  }

  finish(): void {
    this.current.set(this.maxVal());
    this.clearTimer();
  }

  reset(): void {
    this.current.set(0);
    this.clearTimer();
  }

  maxVal(): number {
    return Number.isFinite(this.max()) && this.max() >= 0.1 ? this.max() : 0.1;
  }

  currentVal(): number {
    return Number.isFinite(this.current()) && this.current() >= 0 ? this.current() : 0;
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = undefined;
  }
}
