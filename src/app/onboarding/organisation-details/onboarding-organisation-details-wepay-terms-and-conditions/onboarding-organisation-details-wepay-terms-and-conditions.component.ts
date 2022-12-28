import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { finalize, map, switchMap, takeUntil, tap } from "rxjs/operators";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { LegalEntity } from "src/app/onboarding/organisation-details/models/wepay-legal-entities.model";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { IPAdressService } from "src/app/shared/services/ip-address.service";
import { WePayService } from "src/app/shared/services/wepay.service";
import { notNullOrFalseValidator } from "src/app/shared/validators/notnullorfalse.validator";
import { environment } from "src/environments/environment";
import { OnboardingOrganisationDetailsService } from "../services/onboarding-organisation-details.service";
import { OnboardingOrganisationDetailsWePayStateService } from "../services/onboarding-organisational-details-wepay-state.service";

@Component({
  selector: "app-onboarding-organisation-details-wepay-terms-and-conditions",
  templateUrl:
    "./onboarding-organisation-details-wepay-terms-and-conditions.component.html",
  styleUrls: [
    "./onboarding-organisation-details-wepay-terms-and-conditions.component.scss",
  ],
})
export class OnboardingOrganisationDetailsWePayTermsAndConditionsComponent
  implements OnInit, OnDestroy
{
  loading: boolean = false;
  environment = environment.production ? "production" : "stage";
  apiVersion = "3.0";
  form: FormGroup;
  currentLegalEntity:LegalEntity;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private ipAdressService:IPAdressService,
    private applicationStateService: ApplicationStateService,
    private wePayService: WePayService,
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
    private onboardingWePayStateService: OnboardingOrganisationDetailsWePayStateService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.data.legalEntity) {
      this.currentLegalEntity = this.route.snapshot.data.legalEntity
    }
    this.form = this.formBuilder.group({
      termsOfService: [false, notNullOrFalseValidator()],
      privacyPolicy: [false, notNullOrFalseValidator()]
    })
  }

  submit(){
    this.loading = true;
    let acceptanceTime = Math.floor(Date.now() / 1000);
    this.ipAdressService.getMyIpAddress().pipe(
      takeUntil(this.ngUnsubscribe),
      map((ipAddressObj:any)=>{
        return { 
          controller:{
            email: this.applicationStateService.currentUserModel.Email,
            email_is_verified: true
          },
          terms_of_service : {
              acceptance_time:acceptanceTime, original_ip: ipAddressObj.ip, terms_of_service_version: 'platform'
            }
        }
      }),
      switchMap((updatedPropertiesObj)=>{
        return this.wePayService.updateLegalEntityProperties(this.currentLegalEntity.id,updatedPropertiesObj)
      }),
      tap((savedLegalEntity:LegalEntity)=>{
        this.onboardingWePayStateService.currentWePayLegalEntity = savedLegalEntity;
      }),
      switchMap((_)=>{
        const organisationId = this.dashboardService.currentOrganisation.Id;
        return this.onboardingOrganisationDetailsService.acceptWePayTermsAndConditions(organisationId);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((_)=>{
      this.router.navigate([
        "/",
        "onboarding",
        "organisation-details-us",
        {
          outlets: {
            "onboarding-outlet": ["payout-details"],
          },
        },
      ]);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
