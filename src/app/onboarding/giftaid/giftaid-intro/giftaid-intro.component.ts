import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingGiftAidService } from '../services/onboarding-giftaid.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Component({
  selector: 'app-giftaid-intro',
  templateUrl: './giftaid-intro.component.html',
  styleUrls: ['./giftaid-intro.component.scss']
})
export class GiftaidIntroComponent implements OnInit {
  public form: FormGroup;
  public loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private onboardingGiftAidService: OnboardingGiftAidService, private appStateService: ApplicationStateService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      answer: [null, [Validators.required]]
    });

    this.form.valueChanges.subscribe(async (x) => {
      if(x.answer) {
        this.loading = true
        this.router.navigate(['/', 'onboarding', 'giftaid', { outlets: { 'onboarding-outlet': ['organisation-charity-details'] } }], {
          queryParamsHandling: 'merge'
        }).finally(() => this.loading = false)
      }
      else {
        this.loading = true
        await this.onboardingGiftAidService.denyGiftAid(this.appStateService.currentTokenModel.OrganisationAdmin).toPromise();
        this.router.navigate(['/', 'dashboard'], {
          queryParamsHandling: 'merge'
        }).finally(() => this.loading = false)
      }
    });
  }

}
