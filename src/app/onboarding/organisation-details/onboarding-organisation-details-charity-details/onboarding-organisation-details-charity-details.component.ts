import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { Router } from '@angular/router';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin, Subject } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';
import { noSpacesValidator } from 'src/app/shared/validators/no-spaces.validator';

@Component({
    selector: 'app-onboarding-organisation-details-charity-details',
    templateUrl: './onboarding-organisation-details-charity-details.component.html',
    styleUrls: ['./onboarding-organisation-details-charity-details.component.scss']
})
export class OnboardingOrganisationDetailsCharityDetailsComponent implements OnInit, OnDestroy {
    public form: UntypedFormGroup
    public loading = false;
    private ngUnsubscribe = new Subject<void>();
    constructor(
        private formBuilder: UntypedFormBuilder,
        private onboardingStateService: OnboardingOrganisationDetailsStateService,
        private router: Router,
        private translationService: TranslateService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        var regulator = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.Regulator;
        var referenceWithRegulator = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.CharityCommissionNumber;
        var referenceWithHMRC = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.CharityId;

        this.form = this.formBuilder.group({
            regulator: [regulator ? regulator : null, [Validators.required]],
            referenceWithRegulator: [{ value: referenceWithRegulator ? referenceWithRegulator : null, disabled: true }, [Validators.required, Validators.maxLength(30), notNullOrEmptyValidator()]],
            referenceWithHMRC: [{ value: referenceWithHMRC ? referenceWithHMRC : null, disabled: true }, [Validators.maxLength(30), noSpacesValidator()]]
        });

        this.form.get('regulator').valueChanges.subscribe(x => this.onChangeRegulator(x));
        // make sure the controls are loaded upon navigation forward backwards
        // else it could be the field is disabled, but the user could fill it in ?
        // so re-evaulate the controls
        this.onChangeRegulator(this.form.value.regulator);
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

        const regulatorErrors = this.form.get('regulator').errors;
        const referenceWithRegulatorErrors = this.form.get('referenceWithRegulator').errors;
        const referenceWithHMRCErrors = this.form.get('referenceWithHMRC').errors;
        if (regulatorErrors) {
            if (regulatorErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.regulator-required'));
            }
        }
        if (referenceWithRegulatorErrors) {
            if (referenceWithRegulatorErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.regulator-reference-required'));
            }
        }

        if (referenceWithHMRCErrors) {
            if (referenceWithHMRCErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.hmrc-reference-required'));
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
        this.loading = true;
        var currentOrganisationRegistrationDetailModel: UpdateOrganisationCommand = this.onboardingStateService.currentOrganisationRegistrationDetailsModel
        currentOrganisationRegistrationDetailModel.Regulator = this.form.value.regulator;
        currentOrganisationRegistrationDetailModel.CharityCommissionNumber = this.form.value.referenceWithRegulator;
        currentOrganisationRegistrationDetailModel.ReferenceWithParent = this.form.value.referenceWithParent;
        currentOrganisationRegistrationDetailModel.CharityId = this.form.value.referenceWithHMRC;
        this.onboardingStateService.currentOrganisationRegistrationDetailsModel = currentOrganisationRegistrationDetailModel
        this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['complete'] } }]).finally(() => this.loading = false);
    }
    onChangeRegulator(selectedValue: number) {
        let enableCharityId = false;
        let enableRegulatorReference = false;
        switch (selectedValue) {
            case null:
                enableCharityId = false;
                enableRegulatorReference = false;
                break;
            case 0:
                enableRegulatorReference = false;
                enableCharityId = true;
                break;
            case 4:
                enableCharityId = true;
                enableRegulatorReference = false;
                break;
            case 5:
            case 6:
            case 7:
                enableCharityId = false;
                enableRegulatorReference = true;
                break;
            default:
                enableCharityId = true;
                enableRegulatorReference = true;
                break;
        }
        enableCharityId === true ? this.form.get('referenceWithHMRC').enable() : this.form.get('referenceWithHMRC').disable()
        enableRegulatorReference === true ? this.form.get('referenceWithRegulator').enable() : this.form.get('referenceWithRegulator').disable()

        // reset the field values because they might have been disabled or are disabled now
        // this way, we cannot have unexpected input ( for example HMRC ID when the field was disabled )
        this.form.get('referenceWithRegulator').reset();
        this.form.get('referenceWithHMRC').reset();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
