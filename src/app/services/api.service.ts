import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import event from '../utils/event';
import MESSAGES from '../constants/messages';
import { Response } from '../types/response.d';

@Injectable()
export class ApiService {

  public errorCode: string = null;
  public errorDetail: string = null;

  constructor (
    private router: Router,
    private http: HttpClient
  ) {
  }

  get (api: string, params = { }): Observable<any> {
    this.errorCode = null;
    this.errorDetail = null;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params
    };
    event.lockUI.next({ lock: true, key: api });
    return this.http.get(environment.backend + api, httpOptions).pipe(
      map((response: Response) => {
        if (response.error) {
          throw(response.error);
        } else {
          event.lockUI.next({ lock: false, key: api });
          return response.data;
        }
      }),
      catchError(error => {
        event.lockUI.next({ lock: false, key: api });
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  post (api: string, params = { }): Observable<any> {
    this.errorCode = null;
    this.errorDetail = null;
    event.lockUI.next({ lock: true, key: api });
    return this.http.post(environment.backend + api, params).pipe(
      map((response: Response) => {
        if (response.error) {
          throw(response.error);
        } else {
          event.lockUI.next({ lock: false, key: api });
          return response.data;
        }
      }),
      catchError(error => {
        event.lockUI.next({ lock: false, key: api });
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  handleError (error: any) {
    console.log(error);
    if (error && error.code) {
      if (error.code === 'B002') {
        this.router.navigate(['/signin']);
      } else if (error.code.substr(0, 1) === 'B') {
        event.messageDialog.next({
          id: error.code
        });
      } else {
        if (MESSAGES[error.code]) {
          this.errorCode = error.code;
          this.errorDetail = MESSAGES[this.errorCode].message;
        } else {
          this.errorCode = 'S002';
          this.errorDetail = MESSAGES[this.errorCode].message;
        }
        this.router.navigate(['error']);
      }
    } else {
      this.errorCode = 'S001';
      let text = '';
      if (error && error.name) {
        text += '[name: ' + error.name + ']';
      }
      if (error && error.status) {
        text += '[status: ' + error.status + ']';
      }
      if (error && error.statusText) {
        text += '[statusText: ' + error.statusText + ']';
      }
      this.errorDetail = text;
      this.router.navigate(['error']);
    }
  }

}
