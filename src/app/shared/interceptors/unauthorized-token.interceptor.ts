import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedTokenInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchErrorStatus(401, () => this.router.navigate(['/','account','login'])));
  }
}
