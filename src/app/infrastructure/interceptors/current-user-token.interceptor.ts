import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationStateService } from '../services/application-state.service';


@Injectable({
  providedIn: 'root'
})
export class CurrentUserTokenInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private stateService: ApplicationStateService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentRequest = this.stateService.currentTokenModel;
    if (currentRequest && currentRequest.access_token && currentRequest.access_token.length >  0) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentRequest.access_token}`
        }
      });
    }
    return next.handle(req);
  }
}
