import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-bank-account-signing-direct-debit-guarantee',
  templateUrl: './onboarding-bank-account-signing-direct-debit-guarantee.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-signing-direct-debit-guarantee.component.scss']
})
export class OnboardingBankAccountSigningDirectDebitGuaranteeComponent implements OnInit {
  public loading = false;
  public form: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      acceptedDirectDebitGuarantee: [null, [Validators.required]]
    });

    this.form.valueChanges.subscribe(x => this.handleAcceptOrRefusal());
  }
  handleAcceptOrRefusal(): void {
    if (this.form.value.acceptedDirectDebitGuarantee){
      this.router.navigate(['/','onboarding','bank-account-signing',{outlets:{'onboarding-outlet':['completed']}}],{
        queryParamsHandling:'merge'
      }).finally(() => this.loading =false);
    }else{
      this.router.navigate(['/','onboarding','bank-account-signing',{outlets:{'onboarding-outlet':['details-incorrect']}}],{
        queryParamsHandling:'merge'
      }).finally(() => this.loading =false);
    }
  }
}
