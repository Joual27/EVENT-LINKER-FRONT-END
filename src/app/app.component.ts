import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuccessPopupComponent } from "./shared/ui/success-popup/success-popup.component";
import { Store } from '@ngrx/store';
import { showSuccessPopup } from './shared/ui-state/ui.actions';
import { FailurePopupComponent } from "./shared/ui/failure-popup/failure-popup.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SuccessPopupComponent, FailurePopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent implements OnInit{ 
  private store = inject(Store);
  title = 'EventLinkerFrontEnd';
 

  ngOnInit(): void {
   
  } 
}
