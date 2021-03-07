import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {TemplaterComponent} from "./templater/templater.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {HeroFormComponent} from './hero-form/hero-form.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginPageComponent},
  { path: 'reg', component: RegistrationPageComponent},
  { path: 'temp', component: HeroFormComponent/*, canActivate:[AuthGuardService]*/},
  { path: 'settings', component: AccountSettingsComponent/*, canActivate:[AuthGuardService]*/},
  { path: 'templater', component: TemplaterComponent/*, canActivate:[AuthGuardService]*/ }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
