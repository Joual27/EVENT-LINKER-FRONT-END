import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuccessPopupComponent } from "./shared/ui/success-popup/success-popup.component";
import { Store } from '@ngrx/store';
import { showSuccessPopup } from './shared/ui-state/ui.actions';
import { FailurePopupComponent } from "./shared/ui/failure-popup/failure-popup.component";
import { EncryptionService } from './modules/auth/services/encryption.service';
import { loginSuccess } from './modules/auth/state/auth.actions';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SuccessPopupComponent, FailurePopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})

export class AppComponent implements OnInit{ 
  private store = inject(Store);
  private encryptionService = inject(EncryptionService);
 
  ngOnInit(): void {
    const user = this.encryptionService.getLoggedInUser();
    if(user){
      this.store.dispatch(loginSuccess({user : user}));
    }
  } 
}
