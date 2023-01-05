import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import Swal from 'sweetalert2';
import { environment } from "src/environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { OnboardingOrganisationDetailsService } from "../services/onboarding-organisation-details.service";

@Component({
  selector: "app-onboarding-organisation-details-wepay-payout-details",
  templateUrl:
    "./onboarding-organisation-details-wepay-payout-details.component.html",
  styleUrls: [
    "./onboarding-organisation-details-wepay-payout-details.component.scss",
  ],
})
export class OnboardingOrganisationDetailsWePayPayoutDetailsComponent
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
    private translationService: TranslateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
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
    let iframe_container_id = "payout-method-iframe";
    let country = "US";
    let ssn4_enabled = true;
    let payoutIframe = window["WePay"].createPayoutIframe(iframe_container_id, {
      country_code: country.toUpperCase(),
      ssn4_enabled: ssn4_enabled,
    });
    if (payoutIframe.error_code) {
      this.hasCreationError = true;
      return;
    }
    this.initialiseEventListenerOnSubmitBtn(payoutIframe);
  }

  initialiseEventListenerOnSubmitBtn(payoutIframe){
    document
    .getElementById("submit-payout-method-button")
    .addEventListener("click", (event) => {
      this.loading = true;
      payoutIframe
        .tokenize()
        .then((response) => {
          this.handleSubmitButtonClick(response);
        })
        .catch((_)=> {
          this.showErrorMessage();
        });
    });
  }
  

  handleSubmitButtonClick(response){
    console.log(response,'response')
    // this.loading = true;
    // let payoutBankAccountInfo = {
    //   nickname : this.form.get('bankName').value,
    //   account_number: this.form.get('accountNumber').value,
    //   account_type: this.form.get('accountType').value,
    //   routing_number: this.form.get('routingNumber').value
    //  }
    //  const organisationId = this.dashboardService.currentOrganisation.Id;
    //  this.onboardingOrganisationDetailsService.saveWePayPayoutMethod(organisationId,payoutBankAccountInfo).pipe(
    //   takeUntil(this.ngUnsubscribe),
    //   finalize(()=>this.loading = false),
    //  ).subscribe(_=>{
    //   this.router.navigate([
    //     "/",
    //     "onboarding",
    //     "organisation-details-us",
    //     {
    //       outlets: {
    //         "onboarding-outlet": ["complete"],
    //       },
    //     },
    //   ]);
    //  },error=>{
    //   this.showOnboardingErrorMessage();
    //  })
  }

  async showOnboardingSuccessMessage(){
    Swal.fire({
      icon: 'success',
      title: await this.translationService.get('OnboardingOrganisationDetailsWePayPayoutDetailsComponent.SuccessTitle').toPromise(),
      text: await this.translationService.get('OnboardingOrganisationDetailsWePayPayoutDetailsComponent.SuccessSubTitle').toPromise(),
      confirmButtonText: await this.translationService.get('OnboardingOrganisationDetailsWePayPayoutDetailsComponent.ConfirmBtnText').toPromise()
    }).then((result) => {
      console.log('fired!')
    })
  }

  async showErrorMessage() {
    Swal.fire({
      icon: "error",
      title:await this.translationService.get('OnboardingOrganisationDetailsWePayPayoutDetailsComponent.ErrorTitle').toPromise(),
      text: await this.translationService.get('OnboardingOrganisationDetailsWePayPayoutDetailsComponent.ErrorSubTitle').toPromise(),
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
