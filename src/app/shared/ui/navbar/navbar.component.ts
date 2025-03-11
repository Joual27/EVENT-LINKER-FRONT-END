import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSignedInUser } from '../../../modules/auth/state/auth.selectors';
import { DecodedToken } from '../../../modules/auth/models';
import { JwtService } from '../../../modules/auth/services/jwt.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private store = inject(Store);
  private jwtService = inject(JwtService);
  decodedUserData = signal<DecodedToken | null>(null);

  constructor(){
    this.store.select(selectSignedInUser).subscribe(user => 
    {
      if(user && user.token){
        this.decodedUserData.set(this.jwtService.decodeToken(user.token))
      }else{
        this.decodedUserData.set(null);
      }
    }
    )
  }
}
