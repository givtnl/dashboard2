import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { finalize, map, switchMap, takeUntil, tap } from "rxjs/operators";
import { LegalEntity } from "src/app/onboarding/organisation-details/models/wepay-legal-entities.model";
import { Account } from "src/app/onboarding/organisation-details/models/wepay-accounts.model";
import { WePayService } from "src/app/shared/services/wepay.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { OnboardingOrganisationDetailsWePayStateService } from "../services/onboarding-organisational-details-wepay-state.service";
import { BackendService } from "src/app/infrastructure/services/backend.service";
import { OnboardingOrganisationDetailsService } from "../services/onboarding-organisation-details.service";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Component({
  selector: "app-onboarding-organisation-details-wepay-kyc-iframe",
  templateUrl:
    "./onboarding-organisation-details-wepay-kyc-iframe.component.html",
  styleUrls: [
    "./onboarding-organisation-details-wepay-kyc-iframe.component.scss",
  ],
})
export class OnboardingOrganisationDetailsWePayIframeComponent
  implements OnInit, OnDestroy
{
  loading: boolean = false;
  hasConfigurationError: boolean = false;
  hasCreationError: boolean = false;
  iframeLoading: boolean = false;
  environment = environment.production ? "production" : "stage";
  apiVersion = "3.0";
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private wePayService: WePayService,
    private router: Router,
    private translationService: TranslateService,
    private onboardingWePayStateService: OnboardingOrganisationDetailsWePayStateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.initialiseIframe();
  }

  initialiseIframe() {
    var error = window["WePay"].configure(
      this.environment,
      environment.wePayAppId,
      this.apiVersion
    );
    if (error) {
      this.iframeLoading = false;
      this.hasConfigurationError = true;
      return;
    }
    var iframe_container_id = "kyc-iframe";
    var country = "US";
    var ssn4_enabled = true;
    var kycIframe = window["WePay"].createKycIframe(iframe_container_id, {
      country_code: country.toUpperCase(),
      ssn4_enabled: ssn4_enabled,
    });
    if (kycIframe.error_code) {
      this.hasCreationError = true;
      return;
    }
    this.initialiseEventListenerOnSubmitBtn(kycIframe);
  }

  initialiseEventListenerOnSubmitBtn(kycIframe){
    document
    .getElementById("submit-kyc-button")
    .addEventListener("click", (event) => {
      this.loading = true;
      kycIframe
        .tokenize()
        .then((response) => {
          this.handleSubmitButtonClick(response);
        })
        .catch((error)=> {
          this.showErrorMessage();
        });
    });
  }

  handleSubmitButtonClick(response){
    this.wePayService
    .createLegalEntityWithTokenID(response.id)
    .pipe(
      takeUntil(this.ngUnsubscribe),
      tap((legalEntity: LegalEntity)=>{this.onboardingWePayStateService.currentWePayLegalEntity = legalEntity}),
      map((legalEntity: LegalEntity)=>{
        return <Account>{
          legal_entity_id: legalEntity.id,
          name: legalEntity.entity_name,
          description: legalEntity.description,
          industry: {
            merchant_category_code: (legalEntity.custom_data && legalEntity.custom_data.merchant_category_code)?
            legalEntity.custom_data.merchant_category_code:null
          },
          statement_description: `GIVT Donation: ${legalEntity.entity_name}`
        }
      }),
      switchMap((account: Account)=>{
        return this.wePayService.createAccount(account);
      }),
      switchMap((createdAccount:Account)=>{
        const obj = {
          wePayLegalEntityId: this.onboardingWePayStateService.currentWePayLegalEntity.id,
          wePayAccountId: createdAccount.id
        }
        const organisationId = this.dashboardService.currentOrganisation.Id;
        return this.onboardingOrganisationDetailsService.saveWePayKYCDetails(organisationId,obj);
      }),
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe(
      (_) => {
        this.router.navigate([
          "/",
          "onboarding",
          "organisation-details-us",
          {
            outlets: {
              "onboarding-outlet": ["terms-and-conditions"],
            },
          },
        ]);
      },
      (error) => {
        this.showErrorMessage();
      }
    );
  }

  async showErrorMessage() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: await this.translationService
        .get("OnboardingOrganisationDetailsWePayIframeComponent.submitError")
        .toPromise(),
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
