import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OnboardingInterceptor } from './onboarding/interceptors/onboarding.interceptor';
@NgModule({
	declarations: [ AppComponent ],
	imports: [ BrowserModule, BrowserAnimationsModule, AppRoutingModule,HttpClientModule, ToastrModule.forRoot(), SharedModule ],
	bootstrap: [ AppComponent ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: OnboardingInterceptor,
            multi: true
        }
    ]
	
})
export class AppModule {}
