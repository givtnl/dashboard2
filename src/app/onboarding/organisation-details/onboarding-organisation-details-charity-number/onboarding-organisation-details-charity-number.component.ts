import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';
import { OnboardingOrganisationDetailsService } from '../services/onboarding-organisation-details.service';

@Component({
    selector: 'app-onboarding-organisation-details-charity-number',
    templateUrl: './onboarding-organisation-details-charity-number.component.html',
    styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-charity-number.component.scss']
})
export class OnboardingOrganisationDetailsCharityNumberComponent implements OnInit {
    public form: FormGroup
    public loading = false
    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private translationService: TranslateService,
        private onboardingService: OnboardingOrganisationDetailsService,
        private router: Router,
        private stateService: OnboardingOrganisationDetailsStateService) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            charityNumber: [this.stateService.currentCharityNumber || null, [Validators.required, notNullOrEmptyValidator()]]
        });
    }
    async submit() {
        if (this.form.invalid) {
            this.handleInvalidForm();
            return;
        }
        this.stateService.currentCharityNumber = this.form.value.charityNumber;
        this.loading = true;
        try {
            this.stateService.currentOrganisationCharityCommisionModel = await this.onboardingService.get(+this.form.value.charityNumber).toPromise();
            this.stateService.isManualRegistration = false;
            this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['check-details'] } }])
        } catch(exc) {
            this.stateService.isManualRegistration = true;
            this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['verify-organisation-name'] } }]);
        }
        this.loading = false;
    }

    public buildErrorTekst(): string {
        let baseText = this.activatedRoute.snapshot.data.charityErrorBaseText as string;
        let url = this.router.parseUrl("onboarding/organisation-details/(onboarding-outlet:verify-organisation-name)");
        return baseText.replace('[LINK]', this.router.serializeUrl(url));
    }

    handleInvalidForm() {
        let errorMessages = new Array<Observable<string>>();
        let resolvedErrorMessages = new Array<string>();

        const charityNumberErrors = this.form.get('charityNumber').errors;

        if (charityNumberErrors) {
            if (charityNumberErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
            }
        }

        forkJoin(errorMessages)
            .pipe(tap(results => (resolvedErrorMessages = results)))
            .pipe(switchMap(results => this.translationService.get('errorMessages.validation-errors')))
            .subscribe(title =>
                this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
                    enableHtml: true
                })
            );
    }
}
