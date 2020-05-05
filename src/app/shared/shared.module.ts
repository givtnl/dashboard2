import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { HeaderImagePartyComponent } from './components/header-image-party/header-image-party.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BootstrapSizeIndicatorComponent } from './components/bootstrap-size-indicator/bootstrap-size-indicator.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CheckBoxInputComponent } from './components/check-box-input/check-box-input.component';
import { MissingFileTranslationsHandler } from '../infrastructure/services/missing-file-translations.service';
import { QuestionmarkComponent } from './components/questionmark/questionmark.component';
import { CustomCardComponent } from './components/custom-card/custom-card.component';
import { RouterModule } from '@angular/router';
import { UpperCaseDirective } from './directives/upper-case.directive';
import { QuestionmarkPictureComponent } from './components/questionmark-picture/questionmark-picture.component';

@NgModule({
  declarations: [
    HeaderImageComponent,
    HeaderImagePartyComponent,
    SideBarComponent,
    PasswordInputComponent,
    BootstrapSizeIndicatorComponent,
    NavBarComponent,
    CheckBoxInputComponent,
    QuestionmarkComponent,
    CustomCardComponent,
    UpperCaseDirective,
    QuestionmarkPictureComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule.forChild({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingFileTranslationsHandler },
      loader: {
        provide: TranslateLoader,
        useFactory: httpClient => new TranslateHttpLoader(httpClient),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    HeaderImageComponent,
    NavBarComponent,
    CheckBoxInputComponent,
    PasswordInputComponent,
    BootstrapSizeIndicatorComponent,
    HeaderImagePartyComponent,
    SideBarComponent,
    TranslateModule,
    QuestionmarkComponent,
    CustomCardComponent,
    UpperCaseDirective
  ]
})
export class SharedModule { }
