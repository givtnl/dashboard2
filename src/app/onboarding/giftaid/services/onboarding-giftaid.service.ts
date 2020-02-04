import { Injectable } from '@angular/core';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import '../../../shared/extensions/general-extensions';
import { GeneralExtensions } from '../../../shared/extensions/general-extensions';
@Injectable({
  providedIn: 'root'
})
export class OnboardingGiftAidService {
  constructor(private backendService: BackendService) {}

  getPreparedSettings(organisationId: string): Observable<PreparedGiftAidSettings> {
    return this.backendService
      .get(`v2/organisations/${organisationId}/giftaidsettings/prepare`)
      .pipe(map(result => GeneralExtensions.keysToCamelCase(result)));
  }

  isGiftAidEligble(organisationId:string) : Observable<boolean> {
    return this.getPreparedSettings(organisationId)
    .pipe(map(result => true))
    .pipe(catchError(error => of(false)));
  }
}
