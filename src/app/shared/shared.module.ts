import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { HeaderImagePartyComponent } from './components/header-image-party/header-image-party.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BootstrapSizeIndicatorComponent } from './components/bootstrap-size-indicator/bootstrap-size-indicator.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CheckBoxInputComponent } from './components/check-box-input/check-box-input.component';
import { ButtonYesnoComponent } from './components/button-yesno/button-yesno.component';



@NgModule({
  declarations: [HeaderImageComponent,HeaderImagePartyComponent,SideBarComponent, PasswordInputComponent, BootstrapSizeIndicatorComponent, NavBarComponent, CheckBoxInputComponent, ButtonYesnoComponent],
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
  exports:[HeaderImageComponent,NavBarComponent,CheckBoxInputComponent, PasswordInputComponent,BootstrapSizeIndicatorComponent, HeaderImagePartyComponent,SideBarComponent, TranslateModule, ButtonYesnoComponent]
})
export class SharedModule { }
