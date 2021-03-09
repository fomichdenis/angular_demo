import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {FormsModule} from '@angular/forms';
import { TextFieldComponent } from './text-field/text-field.component';
import { TemplaterComponent } from './templater/templater.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DragDropDirective } from './drag-drop.directive';
import { TopBarComponent } from './top-bar/top-bar.component';
import {HttpInterceptorService} from "./service/http-interceptor.service";
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import {NgxDropzoneModule} from "ngx-dropzone";

import { HeroFormComponent } from './hero-form/hero-form.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import { ParagraphsComponent } from './paragraphs/paragraphs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ParagraphComponent } from './paragraph/paragraph.component';
import { ParagraphDetailComponent } from './paragraph-detail/paragraph-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TextFieldComponent,
    TemplaterComponent,
    UploadFileComponent,
    DragDropDirective,
    TopBarComponent,
    AccountSettingsComponent,
    DropZoneComponent,
    HeroFormComponent,
    RegistrationPageComponent,
    ParagraphsComponent,
    ParagraphComponent,
    ParagraphDetailComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgxDropzoneModule,
        BrowserAnimationsModule,
        DragDropModule
    ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorService,
        multi: true
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
