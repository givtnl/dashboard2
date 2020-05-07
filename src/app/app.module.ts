import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OnboardingInterceptor } from './onboarding/new-users/interceptors/onboarding.interceptor';
import { MissingFileTranslationsHandler } from './infrastructure/services/missing-file-translations.service';
import { CurrentUserTokenInterceptor } from './infrastructure/interceptors/current-user-token.interceptor';
import { ValidationErrorInterceptor } from './infrastructure/interceptors/validation-error.interceptor';
import { UnauthorizedTokenInterceptor } from './shared/interceptors/unauthorized-token.interceptor';
import { ErrorTermInterceptor } from './shared/interceptors/error-term.interceptor';
import { ForbiddenInterceptor } from './shared/interceptors/forbidden.interceptor';
import { EncodeHttpParamsInterceptor } from './infrastructure/interceptors/http-params.interceptor';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    TranslateModule.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingFileTranslationsHandler },
      loader: {
        provide: TranslateLoader,
        useFactory: httpClient => new TranslateHttpLoader(httpClient),
        deps: [HttpClient]
      }
    }),
    SharedModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:UnauthorizedTokenInterceptor,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EncodeHttpParamsInterceptor,
      multi: true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ValidationErrorInterceptor,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CurrentUserTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OnboardingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorTermInterceptor,
      multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ForbiddenInterceptor,
        multi: true
    }
  ]
})
export class AppModule {}
