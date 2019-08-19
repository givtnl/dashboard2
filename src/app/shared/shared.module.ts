import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [HeaderImageComponent, PasswordInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: httpClient => new TranslateHttpLoader(httpClient),
          deps: [HttpClient]
      }
  })
      ],
  exports:[HeaderImageComponent, PasswordInputComponent, TranslateModule]
})
export class SharedModule { }
