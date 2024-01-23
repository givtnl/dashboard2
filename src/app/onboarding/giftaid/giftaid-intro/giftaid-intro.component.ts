import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingGiftAidService } from '../services/onboarding-giftaid.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import mixpanel from 'mixpanel-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-giftaid-intro',
    templateUrl: './giftaid-intro.component.html',
    styleUrls: ['./giftaid-intro.component.scss']
})
export class GiftaidIntroComponent implements OnInit,OnDestroy {
    public form: UntypedFormGroup;
    public loading = false;
    private ngUnsubscribe = new Subject<void>();
    constructor(private formBuilder: UntypedFormBuilder, private router: Router, private onboardingGiftAidService: OnboardingGiftAidService, private appStateService: ApplicationStateService) { }

    ngOnInit() {
        mixpanel.track("giftAid:begin");
        this.form = this.formBuilder.group({
            answer: [null, [Validators.required]]
        });

        this.form.valueChanges
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(async (x) => {
            if (x.answer) {
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

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
