import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {TemplaterComponent} from "./templater/templater.component";
import {AuthGuardService} from "./service/auth-guard.service"; // CLI imports router

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginPageComponent},
  { path: 'templater', component: TemplaterComponent, canActivate:[AuthGuardService] }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
