import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchErrorStatus } from "../extensions/observable-extensions";

@Injectable({
    providedIn: 'root'
  })
  export class InternalServerErrorInterceptor implements HttpInterceptor {
    /**
     *
     */
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(catchErrorStatus(500, () => {
          this.router.navigate(['/','system','error-page'])
      }));
    }
  }