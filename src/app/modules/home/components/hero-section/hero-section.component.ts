import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecodedToken } from '../../../auth/models';
import { JwtService } from '../../../auth/services/jwt.service';
import { Store } from '@ngrx/store';
import { selectSignedInUser } from '../../../auth/state/auth.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink , CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
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
