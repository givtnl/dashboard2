import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { finalize, takeUntil, tap } from "rxjs/operators";
import { LegalEntity } from "src/app/onboarding/organisation-details/models/wepay-legal-entities.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { OnboardingOrganisationDetailsWePayStateService } from "../services/onboarding-organisational-details-wepay-state.service";
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
  iframeLoading: boolean = true;
  environment = environment.production ? "production" : "stage";
  apiVersion = "3.0";
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private translationService: TranslateService,
    private onboardingWePayStateService: OnboardingOrganisationDetailsWePayStateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.initialiseIframe();
    this.initIframeLoader();
  }

  initialiseIframe() {
    var error = window["WePay"].configure(
      this.environment,
      environment.wePayAppId,
      this.apiVersion
    );
    if (error) {
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
        .catch((_)=> {
          this.showErrorMessage();
        });
    });
  }

  handleSubmitButtonClick(token){
    this.loading = true;
    let kycToken = token.id;
    let organisationId = this.dashboardService.currentOrganisation.Id
    this.onboardingOrganisationDetailsService.saveWePayKYCDetails(kycToken,organisationId).pipe(
      takeUntil(this.ngUnsubscribe),
      tap((legalEntity: LegalEntity)=>{this.onboardingWePayStateService.currentWePayLegalEntity = legalEntity}),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(
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

  initIframeLoader(){
    setTimeout(()=>{
      this.iframeLoading = false;
    },1500)

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
