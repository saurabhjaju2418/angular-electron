import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [AppComponent]}).compileComponents();
  });

  it('creates the timer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('finishes and resets the timer', () => {
    const component = TestBed.createComponent(AppComponent).componentInstance;
    component.finish();
    expect(component.isFinished()).toBe(true);
    component.reset();
    expect(component.currentVal()).toBe(0);
  });

  it('renders the timer heading', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain('Electron Timer');
  });
});
