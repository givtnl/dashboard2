import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
    providedIn: 'root'
})
export class TranslatedValueResolver implements Resolve<string> {
    /**
     *
     */
    constructor(private translationService: TranslateService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): string | Observable<string> | Promise<string> {

        const toResolveTranslationKey = route.data.toResolveTranslationKey;
        if (!toResolveTranslationKey) {
            return null;
        }
        return this.translationService.get(toResolveTranslationKey);

    }
}
