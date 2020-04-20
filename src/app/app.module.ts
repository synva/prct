import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { MainComponent } from './main/main.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorComponent } from './error/error.component';

import { TopComponent } from './main/top/top.component';
import { AdminComponent } from './main/admin/admin.component';
import { ChargeComponent } from './main/charge/charge.component';
import { SampleComponent } from './main/sample/sample.component';
import { TreasureComponent } from './main/treasure/treasure.component';

// services
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';

// utils
import { Interceptor } from './utils/interceptor';
import { InitGuard } from './utils/initGuard';
import { AuthGuard } from './utils/authGuard';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/M/D',
    monthYearLabel: 'YYYY/MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY/MMMM',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SigninComponent,
    SignupComponent,
    ErrorComponent,
    TopComponent,
    AdminComponent,
    ChargeComponent,
    SampleComponent,
    TreasureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    InitGuard,
    AuthGuard,
    ApiService,
    UserService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
