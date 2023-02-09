import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { finalize, takeUntil, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { TranslatableToastrService } from "src/app/shared/services/translate-able-toastr.service";
import { OnboardingWePayService } from "../services/onboarding-wepay.service";

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
    private onboardingWePayService: OnboardingWePayService,
    private dashboardService: DashboardService,
    private toastr: TranslatableToastrService
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

  initialiseEventListenerOnSubmitBtn(kycIframe) {
    document
      .getElementById("submit-kyc-button")
      .addEventListener("click", (event) => {
        console.log("fired");
        this.loading = true;
        kycIframe
          .tokenize()
          .then((response) => {
            this.handleSubmitButtonClick(response);
          })
          .catch((_) => {
            this.showErrorMessage();
            this.loading = false;
          });
      });
  }

  handleSubmitButtonClick(token) {
    this.loading = true;
    let organisationId = this.dashboardService.currentOrganisation.Id;
    this.onboardingWePayService
      .saveWePayKYCDetails(token.id, organisationId)
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
          {
            outlets: {
              "onboarding-outlet": ["terms-and-conditions"],
            },
          },
        ]);
      });
  }

  initIframeLoader() {
    setTimeout(() => {
      this.iframeLoading = false;
    }, 1500);
  }

  async showErrorMessage() {
    this.toastr.warning(
      "OnboardingOrganisationDetailsWePayComponent.submitErrorTitle",
      "OnboardingOrganisationDetailsWePayComponent.submitErrorSubTitle"
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
