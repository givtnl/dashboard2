import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable, Injector } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CompositeCanActivateGuard implements CanActivate {

    constructor(private injector: Injector) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UrlTree | boolean> {
        var compositeCanActivate: UrlTree | boolean = true;

        let routeGuards = route.data.routeGuards;
        if (routeGuards) {
            for (const routeGuard of routeGuards) {
                const guard = this.injector.get<CanActivate>(routeGuard);
                compositeCanActivate = (await guard.canActivate(route, state)) as UrlTree | boolean;
                if (!compositeCanActivate || typeof(compositeCanActivate) === typeof(UrlTree)) {
                    return compositeCanActivate;
                }
            }
        }
        return compositeCanActivate;
    }
}