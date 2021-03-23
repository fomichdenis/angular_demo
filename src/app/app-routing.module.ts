import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {TemplaterComponent} from "./templater/templater.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {HeroFormComponent} from './hero-form/hero-form.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {ParagraphsComponent} from "./paragraphs/paragraphs.component";
import {HeaderCombineComponent} from "./header-combine/header-combine.component";
import {DropZoneComponent} from "./drop-zone/drop-zone.component";
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginPageComponent},
  { path: 'reg', component: RegistrationPageComponent},
  { path: 'settings', component: AccountSettingsComponent/*, canActivate:[AuthGuardService]*/},
  { path: 'templater', component: HeroFormComponent/*, canActivate:[AuthGuardService]*/ },
  { path: 'paragraphs', component: ParagraphsComponent},
  { path: 'header_combine', component: HeaderCombineComponent}
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
