import { Injectable } from '@angular/core';

import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable, of } from 'rxjs';
import { CurrentTokenModel } from 'src/app/infrastructure/models/current-token.model';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { tap, switchMap } from 'rxjs/operators';
import { CurrentUserModel } from 'src/app/infrastructure/models/current-user.model';
import { CurrentUserExtensionModel } from 'src/app/infrastructure/models/current-user-extension.model';
import { PasswordForgottenNewPasswordComponent } from '../password-forgotten-new-password/password-forgotten-new-password.component';
import { PasswordForgottenNewPasswordModel } from '../models/password-forgotten-new-password.model';
import { PasswordForgottenConfirmPasswordCommand } from '../models/password-forgotten-confirm-password.command';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private backendService: BackendService, private applicationStateService: ApplicationStateService) {}

  private me(): Observable<CurrentUserModel> {
    return this.backendService
      .get<CurrentUserModel>(`v2/users`)
      .pipe(tap(currentUser => (this.applicationStateService.currentUserModel = currentUser)))
      .pipe(
        switchMap(answer =>
          this.backendService
            .get<CurrentUserExtensionModel>(`v2/usersextension`)
            .pipe(tap(extensionModel => (this.applicationStateService.currentUserExtensionModel = extensionModel)))
            .pipe(switchMap(extensionModel => of(answer)))
        )
      );
  }

  public login(username: string, password: string): Observable<CurrentUserModel> {
    let form = new FormData();
    form.append('grant_type', 'password');
    form.append('userName', username);
    form.append('password', password);
    return this.backendService
      .post<CurrentTokenModel>('v2/users/login', form)
      .pipe(tap(token => (this.applicationStateService.currentTokenModel = token)))
      .pipe(switchMap(x => this.me()));
  }

  public passwordReset(email: string): Observable<object> {
    return this.backendService.post(`v2/users/forgotpassword?email=${encodeURIComponent(email)}&newDashboard=true`, {});
  }

  public passwordResetConfirm(command: PasswordForgottenConfirmPasswordCommand): Observable<any> {
    return this.backendService.http.post(
      `${this.backendService.baseUrl}v2/users/resetpassword`,
      {
        userID: command.email,
        passwordToken: command.code,
        newPassword: command.password
      },
      { responseType: 'text' }
    );
  }

  public logOut(): void {
    this.applicationStateService.clear();
  }
}
