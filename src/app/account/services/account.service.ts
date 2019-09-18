import { Injectable } from '@angular/core';

import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable, of } from 'rxjs';
import { CurrentTokenModel } from 'src/app/infrastructure/models/current-token.model';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { tap, switchMap } from 'rxjs/operators';
import { CurrentUserModel } from 'src/app/infrastructure/models/current-user.model';
import { CurrentUserExtensionModel } from 'src/app/infrastructure/models/current-user-extension.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private backendService: BackendService, private applicationStateService: ApplicationStateService) {}

  me(): Observable<CurrentUserModel> {
    return this.backendService
      .get<CurrentUserModel>(`v2/users`)
      .pipe(tap(currentUser => (this.applicationStateService.currentUserModel = currentUser)))
      .pipe(
        switchMap(answer =>
          this.backendService
            .get<CurrentUserExtensionModel>(`v2/usersextension`)
            .pipe(tap(extensionModel => (this.applicationStateService.currentUserExtensionTokenModel = extensionModel)))
            .pipe(switchMap(extensionModel => of(answer)))
        )
      );
  }

  login(username: string, password: string): Observable<CurrentUserModel> {
    let form = new FormData();
    form.append('grant_type', 'password');
    form.append('userName', username);
    form.append('password', password);
    return this.backendService
      .post<CurrentTokenModel>('v2/users/login', form)
      .pipe(tap(token => (this.applicationStateService.currentTokenModel = token)))
      .pipe(switchMap(x => this.me()));
  }
}
