import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './authguard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login',
   component: LoginComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    pathMatch: 'full', 
    canActivate: [AuthGuard]
   },
   { path: '**', redirectTo: '/dashboard' } //otherwise redirect to dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
