import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { CharityCommisionOrganisationDetailModel } from '../models/charity-commision-organisation-detail.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-onboarding-organisation-details-verify',
  templateUrl: './onboarding-organisation-details-verify.component.html',
  styleUrls: ['../../onboarding.scss', './onboarding-organisation-details-verify.component.scss']
})
export class OnboardingOrganisationDetailsVerifyComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  public loading = false;
  public organisationDetails: CharityCommisionOrganisationDetailModel;
  private ngUnsubscribe = new Subject<void>();
  constructor(private formBuilder: UntypedFormBuilder, private router: Router, public stateService: OnboardingOrganisationDetailsStateService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      detailsCorrect: [null, [Validators.required]]
    });

    this.organisationDetails = this.stateService.currentOrganisationCharityCommisionModel;

    this.form.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(answer => {
      this.loading = true;
      this.router
        .navigate(
          [
            '/',
            'onboarding',
            'organisation-details',
            { outlets: { 'onboarding-outlet': [answer.detailsCorrect ? 'complete' : 'incorrect'] } }
          ],
          {
            queryParamsHandling: 'merge'
          }
        )
        .finally(() => (this.loading = false));
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
