import { AsyncPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

/**
 * A simple example highlight Signals VS RxJS approach for state management..
 */
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './simple-signal.component.html'
  })
  export class App {
    // Using Rxjs
    private state$ = new BehaviorSubject<{ counter: number }>({ counter: 0 });
    protected counter$ = this.state$.pipe(map((value) => value.counter));
  
    // Using Signals
    private state = signal<{ counter: number }>({ counter: 0 });
    protected counter = computed(() => this.state().counter);
  
    constructor() {
      this.state$.subscribe((value) => {
        console.log('Subject is : ', value.counter);
      });
  
      effect(() => {
        console.log('Singal is : ', this.counter());
      });
    }
  
    increase() {
      this.state$.next({ counter: this.state$.value.counter + 1 });
  
      this.state.update((state) => ({ counter: state.counter + 1 }));
    }
  
    decrease() {
      this.state$.next({ counter: this.state$.value.counter - 1 });
      this.state.update((state) => ({ counter: state.counter - 1 }));
    }
  }