import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnboardingWelcomeComponent } from './onboarding-welcome/onboarding-welcome.component';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';

@NgModule({
  declarations: [
    AppComponent,
    OnboardingWelcomeComponent,
    HeaderImageComponent,
    PasswordInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
