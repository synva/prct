import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import event from '../utils/event';

@Injectable()
export class InitGuard implements CanActivate {

  constructor (
    private router: Router
  ) {
  }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    event.toTop.next(null);
    return true;
  }
}
