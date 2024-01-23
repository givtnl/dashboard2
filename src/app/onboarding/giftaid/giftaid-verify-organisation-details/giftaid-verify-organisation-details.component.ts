import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';

@Component({
    selector: 'app-giftaid-verify-organisation-details',
    templateUrl: './giftaid-verify-organisation-details.component.html',
    styleUrls: ['../../onboarding.scss', './giftaid-verify-organisation-details.component.scss']
})
export class GiftaidVerifyOrganisationDetailsComponent implements OnInit,OnDestroy {
    public form: UntypedFormGroup;
    public loading = false;
    public giftAidSettings: PreparedGiftAidSettings;
    private ngUnsubscribe = new Subject<void>();
    constructor(
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        public stateService: OnboardingGiftAidStateService) { }

    ngOnInit() {
        // setup form
        this.form = this.formBuilder.group({
            detailsCorrect: [null, [Validators.required]]
        });

        // load gift aid settings
        this.giftAidSettings = this.currentSettings;

        // listen to value change
        this.form.valueChanges
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(value => {
            this.loading = true;
            this.router.navigate(['/', 'onboarding', 'giftaid',
                { outlets: { 'onboarding-outlet': [value.detailsCorrect ? 'completed' : 'organisation-charity-details'] } }],
                { queryParamsHandling: 'merge' }
            ).finally(() => this.loading = false)
        })
    }
    private get currentSettings(): PreparedGiftAidSettings {
        return this.stateService.currentGiftAidSettings as PreparedGiftAidSettings;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
