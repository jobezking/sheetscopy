import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppContext } from '../infrastructure/app.context';
import { AppRepository } from '../infrastructure/repositories/app.repository';
import { AppSession } from '../infrastructure/sessions/app.session';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSession } from '../infrastructure/sessions/file.session';
import { GapiSession } from '../infrastructure/sessions/gapi.session';
import { LoggedInGuard } from '../infrastructure/sessions/loggedInGuard';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { UserSession } from '../infrastructure/sessions/user.session';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ErrorPageComponent } from './error-page/error-page.component';

export function initGapi(gapiSession: GapiSession) {
  return () => gapiSession.initClient();
}

const appRoutes: Routes = [ 
  { path: '',  component: LoginPageComponent }, //default component to display
  { path: 'mainpage',  component: MainPageComponent }, //app main page
  { path: 'errorpage',  component: ErrorPageComponent }, //app main page
  { path: '**',   component: NotFoundComponent } //when path cannot be found
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    NotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiSession], multi: true },
    AppContext,
    AppSession,
    FileSession,
    GapiSession,
    UserSession,
    AppRepository,
    UserRepository,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
