import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CharityCommisionOrganisationDetailModel } from '../models/charity-commision-organisation-detail.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class OnboardingOrganisationDetailsService {
  constructor(
    private http: HttpClient,
    private backendService: BackendService
  ) {}
  get(
    charityNumber: string
  ): Observable<CharityCommisionOrganisationDetailModel> {
    return this.backendService.get<CharityCommisionOrganisationDetailModel>(
      `v2/charities/${charityNumber}`
    );
  }
}
