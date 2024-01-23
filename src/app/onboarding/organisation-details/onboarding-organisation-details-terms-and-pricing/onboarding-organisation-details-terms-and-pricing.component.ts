import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { finalize, map, switchMap, takeUntil } from "rxjs/operators";
import { LegalEntity } from "src/app/onboarding/organisation-details/models/wepay-legal-entities.model";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { IPAdressService } from "src/app/shared/services/ip-address.service";
import { notNullOrFalseValidator } from "src/app/shared/validators/notnullorfalse.validator";
import { environment } from "src/environments/environment";
import { TermsOfService } from "../models/wepay-terms-of-service.model";
import { OnboardingWePayService } from "../services/onboarding-wepay.service";

@Component({
  selector: "app-onboarding-organisation-details-terms-and-pricing",
  templateUrl:
    "./onboarding-organisation-details-terms-and-pricing.component.html",
  styleUrls: [
    "./onboarding-organisation-details-terms-and-pricing.component.scss",
  ],
})
export class OnboardingOrganisationDetailsTermsAndPricingComponent
  implements OnInit, OnDestroy
{
  loading: boolean = false;
  environment = environment.production ? "production" : "stage";
  apiVersion = "3.0";
  form: UntypedFormGroup;
  currentLegalEntity: LegalEntity;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private ipAdressService: IPAdressService,
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private onboardingWePayService: OnboardingWePayService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.data.legalEntity) {
      this.currentLegalEntity = this.route.snapshot.data.legalEntity;
    }
    this.form = this.formBuilder.group({
      termsAndPricing: [false, notNullOrFalseValidator()],
    });
  }

  submit() {
    this.loading = true;
    let organisationId = this.dashboardService.currentOrganisation.Id;
    this.onboardingWePayService
      .acceptTermsAndPricing(organisationId)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((_) => {
        this.router.navigate([
          "/",
          "onboarding",
          "organisation-details-us",
          { outlets: { "onboarding-outlet": ["wepay-kyc"] } },
        ]);
      });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
