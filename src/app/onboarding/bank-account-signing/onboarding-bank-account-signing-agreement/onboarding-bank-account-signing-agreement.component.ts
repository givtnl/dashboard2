import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BackendService } from "src/app/infrastructure/services/backend.service";
import { OnboardingBankAccountSigningStateService } from "../services/onboarding-bank-account-signing-state.service";

@Component({
    selector: 'app-onboarding-bank-account-signing-agreement',
    templateUrl: './onboarding-bank-account-signing-agreement.component.html',
    styleUrls: ['./onboarding-bank-account-signing-agreement.component.scss']
})
export class OnboardingBankAccountSigningAgreementComponent implements OnInit {
    public form: FormGroup;
    
    constructor(private formBuilder: FormBuilder,
        private onboardingBankAccountSigningStateService: OnboardingBankAccountSigningStateService,
        private backendService: BackendService,
        private router: Router) { }

    ngOnInit(): void { 
        this.form = this.formBuilder.group({
            acceptedTerms: { value: false, disabled: true }
        })
    }

    handleAccept(): void { 
        this.router.navigate(
            ['/', 'onboarding', 'bank-account-signing', { outlets: { 'onboarding-outlet': ['intro-direct-debit-guarantee'] } }],
            {
              queryParamsHandling: 'merge'
            }
          );
      }
    
    showTerms(): void { 
        this.form.get("acceptedTerms").enable();
        let url = `${this.backendService.baseUrl}v2/organisations/${this.onboardingBankAccountSigningStateService.currentBankAccountHolderDetailModel.OrganisationId}/terms`;
        window.open(url, "_blank");
        window.focus();
    }
}