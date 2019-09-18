import { throwError, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export function catchErrorStatus<T>(status: number, callback: any): OperatorFunction<T, T> {
  return catchError((error: HttpErrorResponse) => {
    if (error.status === status) {
      callback(error);
    }
    return throwError(error);
  });
}
