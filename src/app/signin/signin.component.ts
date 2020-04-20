import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hide = true;
  signinForm: FormGroup;
  loginId: string;
  loginPassword: string;

  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    public userService: UserService
  ) {
    this.signinForm = this.formBuilder.group(
      {
        id: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(4)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)])
      }
    );
  }

  ngOnInit () {
  }

  enter (element) {
    element.focus();
  }

  authenticate () {
    this.signinForm.markAllAsTouched();
    if (this.signinForm.valid) {
      this.userService.authenticate(this.loginId, this.loginPassword).subscribe(() => {
        this.toHome();
      });
    }
  }

  toHome () {
    const params = this.router.parseUrl(this.router.url).queryParams;
    if (params && params.url) {
      this.router.navigate([params.url]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
