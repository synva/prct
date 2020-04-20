import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  signupForm: FormGroup;
  registId: string;
  registPassword: string;
  registconfirmPassword: string;

  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    public userService: UserService
  ) {
    this.signupForm = this.formBuilder.group(
      {
        id: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(4)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)])
      },
      {
        validator: this.matchPassword
      }
    );
  }

  matchPassword (signupForm: FormGroup) {
    if (!!signupForm.controls.password.value && !!signupForm.controls.confirmPassword.value
      && (signupForm.controls.password.value !== signupForm.controls.confirmPassword.value)) {
      signupForm.controls.password.setErrors({ pwdNotEqual: true });
      signupForm.controls.confirmPassword.setErrors({ pwdNotEqual: true });
    } else if (
    !!signupForm.controls.password.value && !!signupForm.controls.confirmPassword.value
    && (signupForm.controls.password.value === signupForm.controls.confirmPassword.value)
    && !signupForm.controls.password.hasError('required') && !signupForm.controls.password.hasError('maxlength')
    && !signupForm.controls.password.hasError('minlength')
    ) {
      signupForm.controls.password.setErrors(null);
      signupForm.controls.confirmPassword.setErrors(null);
    }
  }

  ngOnInit () { }

  enter (element) {
    element.focus();
  }

  register () {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      this.userService.register(this.registId, this.registPassword).subscribe(() => {
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

  back () {
    this.router.navigate(['/signin']);
  }
}
