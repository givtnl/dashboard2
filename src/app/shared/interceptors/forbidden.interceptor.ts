import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';
import { Router } from '@angular/router';
import { TranslatableToastrService } from '../services/translate-able-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private router: Router, private toaster: TranslatableToastrService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchErrorStatus(403, () => {
        this.router.navigate(['/','account','login'])
        this.toaster.error("errorMessages.forbidden", "errorMessages.forbidden.title")
    }));
  }
}
