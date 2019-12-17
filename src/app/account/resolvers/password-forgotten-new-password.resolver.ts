
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PasswordForgottenNewPasswordModel } from '../models/password-forgotten-new-password.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordForgottenNewPasswordResolver implements Resolve<PasswordForgottenNewPasswordModel> {


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): PasswordForgottenNewPasswordModel | Observable<PasswordForgottenNewPasswordModel> | Promise<PasswordForgottenNewPasswordModel> {
    return {
      code: route.queryParams.code,
      email: route.queryParams.email
    }
  }
}
