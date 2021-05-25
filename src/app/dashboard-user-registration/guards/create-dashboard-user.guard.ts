import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CreateDashboardUserGuard implements CanActivate {
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return true;
  }
}
