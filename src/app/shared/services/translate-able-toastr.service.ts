import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig, ActiveToast } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslatableToastrService {
  /**
   *
   */
  constructor(private translationService: TranslateService, private toastr: ToastrService) {}

  /** show successful toast */
  success(message?: string, title?: string, override?: Partial<IndividualConfig>): Promise<ActiveToast<any>> {
    return forkJoin(this.translationService.get(message), this.translationService.get(title))
      .pipe(switchMap(results => of(this.toastr.success(results[0], results[1], override))))
      .toPromise();
  }
  /** show error toast */
  error(message?: string, title?: string, override?: Partial<IndividualConfig>): Promise<ActiveToast<any>> {
    return forkJoin(this.translationService.get(message), this.translationService.get(title))
      .pipe(switchMap(results => of(this.toastr.error(results[0], results[1], override))))
      .toPromise();
  }
  /** show info toast */
  info(message?: string, title?: string, override?: Partial<IndividualConfig>): Promise<ActiveToast<any>> {
    return forkJoin(this.translationService.get(message), this.translationService.get(title))
      .pipe(switchMap(results => of(this.toastr.info(results[0], results[1], override))))
      .toPromise();
  }
  /** show warning toast */
  warning(message?: string, title?: string, override?: Partial<IndividualConfig>): Promise<ActiveToast<any>> {
    return forkJoin(this.translationService.get(message), this.translationService.get(title))
      .pipe(switchMap(results => of(this.toastr.warning(results[0], results[1], override))))
      .toPromise();
  }
}
