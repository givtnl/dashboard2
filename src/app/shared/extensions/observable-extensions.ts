import { throwError, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export function catchErrorStatus<T>(status: number, callback: any): OperatorFunction<T, T> {
  return catchError((error: HttpErrorResponse) => {
    if (error.status === status) {
      console.warn('Catched 401 error');
      callback();
    }
    return throwError(error);
  });
}
