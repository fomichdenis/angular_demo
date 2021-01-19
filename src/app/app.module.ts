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

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TextFieldComponent,
    TemplaterComponent,
    UploadFileComponent,
    DragDropDirective,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
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
