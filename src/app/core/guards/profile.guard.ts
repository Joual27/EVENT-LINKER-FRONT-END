import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSignedInUser } from '../../modules/auth/state/auth.selectors';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);

  canActivate() {
    return this.store.select(selectSignedInUser).pipe(
      take(1),
      map((state) => {
        const user = state;
        if (user && (user.role.toLowerCase() === 'worker' || user.role.toLowerCase() === 'organizer')) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}