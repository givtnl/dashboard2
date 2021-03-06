import { Injectable } from '@angular/core';

import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable, of } from 'rxjs';
import { CurrentTokenModel } from 'src/app/infrastructure/models/current-token.model';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { tap, switchMap } from 'rxjs/operators';
import { CurrentUserModel } from 'src/app/infrastructure/models/current-user.model';
import { CurrentUserExtensionModel } from 'src/app/infrastructure/models/current-user-extension.model';
import { PasswordForgottenConfirmPasswordCommand } from '../models/password-forgotten-confirm-password.command';
import mixpanel from 'mixpanel-browser';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(private backendService: BackendService, private applicationStateService: ApplicationStateService, private dashboardService: DashboardService) { }

    private me(): Observable<CurrentUserModel> {
        mixpanel.track('signin');
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
            .pipe(tap(token => mixpanel.identify(token.GUID)))
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
        this.dashboardService.clear();
        mixpanel.track("signout");
        mixpanel.identify();
    }
}
