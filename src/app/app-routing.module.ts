import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { ErrorComponent } from './error/error.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { TopComponent } from './main/top/top.component';
import { AdminComponent } from './main/admin/admin.component';
import { ChargeComponent } from './main/charge/charge.component';
import { SampleComponent } from './main/sample/sample.component';
import { TreasureComponent } from './main/treasure/treasure.component';

// utils
import { InitGuard } from './utils/initGuard';
import { AuthGuard } from './utils/authGuard';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: TopComponent,
        canActivate: [AuthGuard, InitGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, InitGuard]
      },
      {
        path: 'charge',
        component: ChargeComponent,
        canActivate: [AuthGuard, InitGuard]
      },
      {
        path: 'sample',
        component: SampleComponent,
        canActivate: [AuthGuard, InitGuard]
      },
      {
        path: 'treasure',
        component: TreasureComponent,
        canActivate: [AuthGuard, InitGuard]
      }
    ]
  },
  { path: '**', component: TopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
