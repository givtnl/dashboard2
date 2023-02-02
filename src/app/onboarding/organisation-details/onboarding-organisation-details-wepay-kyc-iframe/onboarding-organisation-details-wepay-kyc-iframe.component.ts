import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { finalize, takeUntil, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { OnboardingOrganisationDetailsService } from "../services/onboarding-organisation-details.service";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { TranslatableToastrService } from "src/app/shared/services/translate-able-toastr.service";
import { AngularWePayService } from "@givtnl/angular-wepay-service";
import { WePay } from "@givtnl/angular-wepay-service/lib/types";

const apiVersion = "3.0";
const kycIframeLabel = "#kycIframe"
const iframe_container_id = "kyc-iframe";
const country = "US";
const ssn4_enabled = true;

@Component({
  selector: "app-onboarding-organisation-details-wepay-kyc-iframe",
  templateUrl:
    "./onboarding-organisation-details-wepay-kyc-iframe.component.html",
  styleUrls: [
    "./onboarding-organisation-details-wepay-kyc-iframe.component.scss",
  ],
})
export class OnboardingOrganisationDetailsWePayIframeComponent
  implements OnInit, OnDestroy, AfterViewInit {
  loading: boolean = false;
  hasConfigurationError: boolean = false;
  hasCreationError: boolean = false;
  iframeLoading: boolean = true;
  environment = environment.production ? "production" : "stage";
  apiVersion = "3.0";
  private ngUnsubscribe = new Subject<void>();
  @ViewChild(kycIframeLabel, { static: false }) public iframeContainer!: ElementRef;
  wepay: WePay;

  constructor(
    private router: Router,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
    private dashboardService: DashboardService,
    private toastr: TranslatableToastrService,
    private wepayService: AngularWePayService
  ) { }

  ngOnInit(): void {
    this.wepay = this.wepayService.wepay;
    this.iframeLoading = false;
  }

  initialiseEventListenerOnSubmitBtn(kycIframe) {
    document
      .getElementById("submit-kyc-button")
      .addEventListener("click", (event) => {
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
    let kycToken = token.id;
    let organisationId = this.dashboardService.currentOrganisation.Id
    this.onboardingOrganisationDetailsService.saveWePayKYCDetails(kycToken, organisationId).pipe(
      takeUntil(this.ngUnsubscribe),
      finalize(() => {
        this.loading = false;
      }),
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
      }
    );
  }

  async showErrorMessage() {
    this.toastr.warning('OnboardingOrganisationDetailsWePayComponent.submitErrorTitle', 'OnboardingOrganisationDetailsWePayComponent.submitErrorSubTitle')
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit() {

    // Styling options documented here: https://dev.wepay.com/clear/cookbooks/style-credit-card-iframes/
    const custom_style = {
      'styles': {
        'cvv-icon': {
          'base': {
            'display': 'none'
          }
        },
        'base': {
          'height': '44px',
          'margin': '0',
          'border-radius': '4px',
          'font-family': 'Avenir',
          'font-size': '16px',
          'color': '#2C2B57',
          '::placeholder': {
            'color': '#BCB9C8'
          },
          ':focus': {
            'border': '1px solid #2C2B57'
          }
        },
        'invalid': {
          'border': '2px solid #D73C49'
        },
        'valid': {
          'border': '1px solid #41C98E'
        },
        'errors': {
          'invalid': {
            'color': '#D73C49'
          }
        }
      }
    };
    // iframe options documented here: https://dev.wepay.com/clear/cookbooks/style-credit-card-iframes/
    const options = {
      custom_style: custom_style,
      show_labels: false,
      show_placeholders: true,
      show_error_messages: false,
      show_error_messages_when_unfocused: false,
      country_code: country.toUpperCase(),
      ssn4_enabled: ssn4_enabled
    };
    let error = this.wepay.configure(
      environment.production ? "production" : "stage",
      environment.wePayAppId, apiVersion);

    if (error) {
      console.log(error)
    };

    var kycIframe = window['WePay'].createKycIframe(iframe_container_id, options);

    if (kycIframe.error_code) {
      this.hasCreationError = true;
      return;
    }

    this.initialiseEventListenerOnSubmitBtn(kycIframe);
  }
}
