import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { finalize, map, switchMap, takeUntil } from "rxjs/operators";
import { LegalEntity } from "src/app/onboarding/organisation-details/models/wepay-legal-entities.model";
import { IPAdressService } from "src/app/shared/services/ip-address.service";
import { notNullOrFalseValidator } from "src/app/shared/validators/notnullorfalse.validator";
import { environment } from "src/environments/environment";
import { OnboardingOrganisationDetailsService } from "../services/onboarding-organisation-details.service";

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
    private router: Router,
    private route: ActivatedRoute,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
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
          originalIp: ipAddressObj.ip,
          acceptanceTime
        }
      }),
      switchMap((termsAndConditionsObj:any)=>{
        return this.onboardingOrganisationDetailsService.acceptWePayTermsAndConditions(termsAndConditionsObj);
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
