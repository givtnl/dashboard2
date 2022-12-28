import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { finalize, switchMap, takeUntil, tap } from "rxjs/operators";
import { LegalEntity } from "src/app/onboarding/organisation-details/models/wepay-legal-entities.model";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { WePayService } from "src/app/shared/services/wepay.service";
import Swal from 'sweetalert2';
import { environment } from "src/environments/environment";
import { PayoutMethod } from "../models/wepay-payout-method.model";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OnboardingOrganisationDetailsService } from "../services/onboarding-organisation-details.service";
import { MatchValidator } from "src/app/shared/validators/match.validator";

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
  environment = environment.production ? "production" : "stage";
  apiVersion = "3.0";
  form: FormGroup;
  currentLegalEntity:LegalEntity;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private translationService: TranslateService,
    private wePayService: WePayService,
    private router: Router,
    private route: ActivatedRoute,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.data.legalEntity)
    if (this.route.snapshot.data.legalEntity) {
      this.currentLegalEntity = this.route.snapshot.data.legalEntity
    }
    this.form = this.formBuilder.group({
      bankName: ['', [Validators.required]],
      routingNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      routingNumber2: [''],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{3,17}$')]],
      accountNumber2:[''],
      accountType:[null, [Validators.required]]
    }, { validators: [MatchValidator('routingNumber', 'routingNumber2'), 
      MatchValidator('accountNumber', 'accountNumber2')]});
  }
  

  submit(){
    this.loading = true;
    let payoutBankAccountInfo = <PayoutMethod>{
      legal_entity_id : this.currentLegalEntity.id,
      nickname : this.form.get('bankName').value,
      type: 'payout_bank_us',
      payout_bank_us: {
        account_number: this.form.get('accountNumber').value,
        account_type: this.form.get('accountType').value,
        routing_number: this.form.get('routingNumber').value
      },
     }
     this.wePayService.createPayoutMethod(payoutBankAccountInfo).pipe(
      takeUntil(this.ngUnsubscribe),
      switchMap((payoutMethod:PayoutMethod)=>{
        const obj = {
          wePayPayoutMethodId: payoutMethod.id
        }
        const organisationId = this.dashboardService.currentOrganisation.Id;
        return this.onboardingOrganisationDetailsService.saveWePayPayoutMethod(organisationId,obj);
      }),
      finalize(()=>this.loading = false),
     ).subscribe(_=>{
      this.router.navigate([
        "/",
        "onboarding",
        "organisation-details-us",
        {
          outlets: {
            "onboarding-outlet": ["complete"],
          },
        },
      ]);
     },error=>{
      this.showOnboardingErrorMessage();
     })
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

  async showOnboardingErrorMessage(){
    Swal.fire({
      icon: 'error',
      showCloseButton: true,
      title: await this.translationService.get('OnboardingOrganisationDetailsWePayPayoutDetailsComponent.ErrorTitle').toPromise(),
      text: await this.translationService.get('OnboardingOrganisationDetailsWePayPayoutDetailsComponent.ErrorSubTitle').toPromise(),
      confirmButtonText: await this.translationService.get('OnboardingOrganisationDetailsWePayPayoutDetailsComponent.ErrorConfirmBtnText').toPromise()
    }).then((result) => {
      if (result.isConfirmed) {
        this.submit();
      }
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
