import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { CurrentOrganisationRegistrationDetailsModel } from '../models/current-organisation-registration-details-model';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { Observable, forkJoin, Subject } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-onboarding-organisation-details-verify-organisation-name',
    templateUrl: './onboarding-organisation-details-verify-organisation-name.component.html',
    styleUrls: ['./onboarding-organisation-details-verify-organisation-name.component.scss']
})
export class OnboardingOrganisationDetailsVerifyOrganisationNameComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject<void>();
    public form: FormGroup
    constructor(
        private formBuilder: FormBuilder,
        private onboardingStateService: OnboardingOrganisationDetailsStateService,
        private router: Router,
        private route: ActivatedRoute,
        private translationService: TranslateService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        var name = this.onboardingStateService.currentOrganisationRegistrationDetailsModel ? this.onboardingStateService.currentOrganisationRegistrationDetailsModel.Name : null

        this.form = this.formBuilder.group({
            organisationName: [name, [Validators.required]]
        })
    }
    submit() {
        if (this.form.invalid) {
            this.handleInvalidForm();
            return;
        }
        this.continue();
    }
    handleInvalidForm() {
        let errorMessages = new Array<Observable<string>>();
        let resolvedErrorMessages = new Array<string>();

        const organisationName = this.form.get('organisationName').errors;

        if (organisationName) {
            if (organisationName.required) {
                errorMessages.push(this.translationService.get('errorMessages.organisation-name-required'));
            }
        }

        forkJoin(errorMessages)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                tap(results => (resolvedErrorMessages = results)),
                switchMap(_ => this.translationService.get('errorMessages.validation-errors')))
            .subscribe(title =>
                this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
                    enableHtml: true
                })
            );

    }
    continue() {
        var currentOrganisationRegistrationDetailModel: UpdateOrganisationCommand = this.onboardingStateService.currentOrganisationRegistrationDetailsModel || Object()
        currentOrganisationRegistrationDetailModel.Name = this.form.value.organisationName;
        this.onboardingStateService.currentOrganisationRegistrationDetailsModel = currentOrganisationRegistrationDetailModel;
        this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['address-details'] } }]);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
