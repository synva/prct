import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';
import { TopComponent } from './main/top/top.component';

// utils
import { InitGuard } from './utils/initGuard';
import { AuthGuard } from './utils/authGuard';

const routes: Routes = [
  // {
  //   path: 'signin',
  //   component: a
  // },
  // {
  //   path: 'signup',
  //   component: b
  // },
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
      // {
      //   path: 'sample',
      //   component: SampleComponent,
      //   canActivate: [AuthGuard, InitGuard]
      // },
    ]
  },
  { path: '**', component: TopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
