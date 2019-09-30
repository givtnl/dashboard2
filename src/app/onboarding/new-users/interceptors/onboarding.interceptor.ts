import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnboardingNewUsersStateService } from '../services/onboarding-new-users-state.service';


@Injectable({
  providedIn: 'root'
})
export class OnboardingInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private stateService: OnboardingNewUsersStateService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentRequest = this.stateService.currentOnboardingRequest;
    if (currentRequest && currentRequest.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentRequest.token}`
        }
      });
    }
    return next.handle(req);
  }
}
