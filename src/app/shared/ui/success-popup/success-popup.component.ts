import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { selectShownSuccessPopup, selectSuccessPopupMessage } from '../../ui-state/ui.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { hideSuccessPopup } from '../../ui-state/ui.actions';



@Component({
  selector: 'app-success-popup',
  imports: [AsyncPipe],
  templateUrl: './success-popup.component.html',
  styleUrl: './success-popup.component.css',
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
export class SuccessPopupComponent{
  private store = inject(Store);
  message$ : Observable<string>;
  isVisible$ : Observable<boolean>;

  constructor () {
    this.message$ = this.store.select(selectSuccessPopupMessage);
    this.isVisible$ = this.store.select(selectShownSuccessPopup);
  }

  hidePopup() : void {
    this.store.dispatch(hideSuccessPopup());
  }
  
}
