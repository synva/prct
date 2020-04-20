import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import event from '../utils/event';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (
    private router: Router,
    private userService: UserService
  ) {
  }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.user.isAnonymous) {
      if (this.userService.user.checkAuthority(state.url)) {
        return true;
      } else {
        event.messageSnackBar.next({
          id: 'B005'
        });
        this.router.navigate(['/']);
      }
    } else {
      return this.userService.login().pipe(
        map(() => {
          if (this.userService.user.checkAuthority(state.url)) {
            return true;
          } else {
            if (this.userService.user.isAnonymous) {
              this.router.navigate(['/signin'], { queryParams: { url: state.url } });
            } else {
              event.messageSnackBar.next({
                id: 'B005'
              });
              this.router.navigate(['/']);
            }
          }
        })
      );
    }
  }
}
