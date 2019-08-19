import { Resolve, RouterStateSnapshot } from '@angular/router';
import { OnboardingRequestModel } from '../models/onboarding-request.model';
import { Observable } from 'rxjs';

export class OnboardingTokenResolver implements Resolve<OnboardingRequestModel>{
    
    resolve(ActivatedRouteSnapshot, state: RouterStateSnapshot): OnboardingRequestModel | Observable<OnboardingRequestModel> | Promise<OnboardingRequestModel> {
        throw new Error("Method not implemented.");
    }

}


 