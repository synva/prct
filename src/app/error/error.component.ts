import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'prct-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  errorCode: string = null;
  errorDetail: string = null;

  constructor (
    private apiService: ApiService
  ) {
    this.errorCode = this.apiService.errorCode;
    this.errorDetail = this.apiService.errorDetail;
  }

}
