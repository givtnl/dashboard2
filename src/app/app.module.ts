import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './shared/serializers/custom-url.serializer';
import { OnboardingInterceptor } from './onboarding/new-users/interceptors/onboarding.interceptor';
import { ApplicationLoadService } from './infrastructure/services/application-load.service';
import { MissingFileTranslationsHandler } from './infrastructure/services/missing-file-translations.service';
import { CurrentUserTokenInterceptor } from './infrastructure/interceptors/current-user-token.interceptor';

export function init_app(appLoadService: ApplicationLoadService) {
  return () => appLoadService.initializeApp();
}

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
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [ApplicationLoadService],
      multi: true
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
      provide: UrlSerializer,
      useClass: CustomUrlSerializer
    }
  ]
})
export class AppModule {}
