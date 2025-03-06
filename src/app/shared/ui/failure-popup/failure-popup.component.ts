import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectErrors, selectShownFailurePopup } from '../../ui-state/ui.selectors';
import { hideFailurePopup } from '../../ui-state/ui.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-failure-popup',
  imports: [AsyncPipe],
  templateUrl: './failure-popup.component.html',
  styleUrl: './failure-popup.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(120%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(120%)' })),
      ]),
    ]),
  ],
})
export class FailurePopupComponent {
  private store = inject(Store);
  isVisible$ : Observable<boolean>;
  errors$ : Observable<string[]>

  constructor(){
    this.isVisible$ = this.store.select(selectShownFailurePopup);
    this.errors$ = this.store.select(selectErrors);
  }

  hidePopup(): void {
    this.store.dispatch(hideFailurePopup());
  }

}
