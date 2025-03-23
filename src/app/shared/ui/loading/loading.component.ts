import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoading } from '../../ui-state/ui.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [AsyncPipe , CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent{
  private store = inject(Store);
  isVisible$ : Observable<boolean>;

  constructor() {
     this.isVisible$ = this.store.select(selectIsLoading);
  }
}
