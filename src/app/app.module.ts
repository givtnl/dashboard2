import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnboardingWelcomeComponent } from './onboarding-welcome/onboarding-welcome.component';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { BackendService } from './services/backend.service'
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    OnboardingWelcomeComponent,
    HeaderImageComponent,
    PasswordInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    BackendService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
