import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { Data } from '../types/data';

import CONSTANTS from '../constants/constants';

@Injectable()
export class UserService {
  public user: User;

  constructor (private apiService: ApiService) {
    this.user = new User(null);
  }

  register (username: string, password: string) {
    if (!this.user.isAnonymous) { this.user.logout(); }
    return this.apiService.post('/register', { user: { _id: username, password } }).pipe(
      map(data => {
        return this.authenticate(username, password).subscribe();
      })
    );
  }
  authenticate (username: string, password: string): Observable<void> {
    return this.apiService.post('/authenticate', { username, password }).pipe(
      map(data => {
        if (data && data.user) {
          this.user.login(data.user);
        }
      })
    );
  }
  login (): Observable<any> {
    const loginObservable = new Observable((observer) => {
      this.user.login({
        _id: 'test',
        password: '123456',
        role: 0
      });
      observer.next();
    });
    return loginObservable;
    // return this.apiService.get('/login').pipe(
    //   map(data => {
    //     if (data && data.user) {
    //       this.user.login(data.user);
    //     }
    //   })
    // );
  }
  logout (): Observable<void> {
    return this.apiService.get('/logout').pipe(
      map(() => {
        this.user.logout();
      })
    );
  }
}
