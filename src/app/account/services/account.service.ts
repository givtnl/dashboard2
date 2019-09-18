import { Injectable } from "@angular/core";

import { BackendService } from "src/app/infrastructure/services/backend.service";
import { Observable } from "rxjs";
import { catchErrorStatus } from "src/app/shared/extensions/observable-extensions";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  constructor(private backendService: BackendService) {}

  login(username: string, password: string): Observable<any> {
    let form = new FormData();
    form.append("grant_type", "password");
    form.append("userName", username);
    form.append("password", password);

    return this.backendService.post("v2/accounts/login", form);
  }
}
