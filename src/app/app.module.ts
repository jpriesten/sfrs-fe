import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { ErrorInterceptor } from './utilities/error.interceptor';
import { JwtInterceptor } from './utilities/jwt.interceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent, PageNotFoundComponent, PasswordResetComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      primaryColour: '#ffffff',
      secondaryColour: '#3b3054',
      backdropBorderRadius: '3px',
      fullScreenBackdrop: true,
    }),
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true,
      easeTime: 700,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
