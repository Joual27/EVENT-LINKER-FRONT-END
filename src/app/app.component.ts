import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuccessPopupComponent } from "./shared/ui/success-popup/success-popup.component";
import { Store } from '@ngrx/store';
import { shownSuccessPopup } from './shared/ui-state/ui.actions';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SuccessPopupComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent implements OnInit{ 
  private store = inject(Store);
  title = 'EventLinkerFrontEnd';
 

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(shownSuccessPopup({message : "ANA ABDELOUAHED SENANE SBE3 OU MOUCHI LHABLA"}))
    } , 2500)
  }
}
