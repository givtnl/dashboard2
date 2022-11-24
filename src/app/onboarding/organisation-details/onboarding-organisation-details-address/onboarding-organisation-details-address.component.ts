import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { postCodeBACSValidator } from 'src/app/shared/validators/postcode-BACS.validator';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';
import { RelationshipType } from 'src/app/organisations/enums/relationship-type.model';
import { DirectDebitType } from 'src/app/shared/enums/direct-debit.type';
import { DirectDebitTypeHelper } from 'src/app/shared/helpers/direct-debit-type.helper';

@Component({
    selector: 'app-onboarding-organisation-details-address',
    templateUrl: './onboarding-organisation-details-address.component.html',
    styleUrls: ['./onboarding-organisation-details-address.component.scss']
})
export class OnboardingOrganisationDetailsAddressComponent implements OnInit {

    public _countries: [string, string][]
    public get countries(): [string, string][] {
        if (this._countries !== null && this._countries !== undefined)
            return this._countries.sort((a, b) => {
                let first = a[0];
                let second = b[0];
                if (["The", "Die"].indexOf(first.split(" ")[0]) != -1) {
                    first = first.split(" ")[1];
                }
                if (["The", "Die"].indexOf(second.split(" ")[0]) != -1) {
                    second = second.split(" ")[1];
                }
                return first.localeCompare(second);
            });
    }
    public set countries(value: [string, string][]) {
        this._countries = value;
    }
    
    public form: UntypedFormGroup
    public loading: boolean;

    constructor(
        private toastr: ToastrService,
        private formBuilder: UntypedFormBuilder,
        private onboardingStateService: OnboardingOrganisationDetailsStateService,
        private router: Router,
        private translationService: TranslateService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.loading = false;
        var address = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.AddressLine1
        var city = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.AddressLine3
        var postcode = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.PostalCode
        var country = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.Country

        this.form = this.formBuilder.group({
            address: [address ? address : null, [Validators.required, notNullOrEmptyValidator()]],
            city: [city ? city : null, [Validators.required, notNullOrEmptyValidator()]],
            postcode: [postcode ? postcode : null, ["GB", "GG", "JE"].some(x => x == country) ? [Validators.required, postCodeBACSValidator(), notNullOrEmptyValidator()] : [Validators.required, Validators.minLength(2), notNullOrEmptyValidator()]],
            country: [country ? country : null, [Validators.required, notNullOrEmptyValidator()]]
        })

        this.countries = [
            [await this.translationService.get("onboardingOrganisationDetailsAddressComponent.countries.JE").toPromise(), "JE"],
            [await this.translationService.get("onboardingOrganisationDetailsAddressComponent.countries.GG").toPromise(), "GG"],
            [await this.translationService.get("onboardingOrganisationDetailsAddressComponent.countries.GB").toPromise(), "GB"],
            [await this.translationService.get("onboardingOrganisationDetailsAddressComponent.countries.NL").toPromise(), "NL"],
            [await this.translationService.get("onboardingOrganisationDetailsAddressComponent.countries.BE").toPromise(), "BE"],
            [await this.translationService.get("onboardingOrganisationDetailsAddressComponent.countries.DE").toPromise(), "DE"],
            [await this.translationService.get("onboardingOrganisationDetailsAddressComponent.countries.IE").toPromise(), "IE"]
        ];
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

        const addressErrors = this.form.get('address').errors;
        const cityErrors = this.form.get('city').errors;
        const postcodeErrors = this.form.get('postcode').errors;
        const countryErrors = this.form.get('country').errors;

        if (addressErrors) {
            if (addressErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.address-required'));
            }
        }

        if (cityErrors) {
            if (cityErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.address-city-required'));
            }
        }

        if (postcodeErrors) {
            if (postcodeErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.address-zipcode-required'));
            }
            if (!postcodeErrors.required && postcodeErrors.invalidPostCode) {
                errorMessages.push(this.translationService.get('errorMessages.postcode-invalid'));
            }
        }

        if (countryErrors) {
            if (countryErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.address-country-required'));
            }
        }
        forkJoin(errorMessages)
            .pipe(tap(results => (resolvedErrorMessages = results)))
            .pipe(tap(results => console.log(results)))
            .pipe(switchMap(() => this.translationService.get('errorMessages.validation-errors')))
            .subscribe(title =>
                this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
                    enableHtml: true
                })
            );
    }
    continue() {
        var currentOrganisationRegistrationDetailModel: UpdateOrganisationCommand = this.onboardingStateService.currentOrganisationRegistrationDetailsModel
        currentOrganisationRegistrationDetailModel.AddressLine1 = this.form.value.address;
        currentOrganisationRegistrationDetailModel.AddressLine3 = this.form.value.city;
        currentOrganisationRegistrationDetailModel.PostalCode = this.form.value.postcode;
        currentOrganisationRegistrationDetailModel.Country = this.form.value.country;
        this.onboardingStateService.currentOrganisationRegistrationDetailsModel = currentOrganisationRegistrationDetailModel
        if (this.route.snapshot.data.relationshipRules.some(rule => rule.Type == RelationshipType.UseRegulatorReference)) {
            this.loading = true;
            this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['complete'] } }])
        }
        else if (DirectDebitTypeHelper.fromOrganisationDetailModel(currentOrganisationRegistrationDetailModel) == DirectDebitType.BACS)
            this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['charity-details'] } }])
        else if (DirectDebitTypeHelper.fromOrganisationDetailModel(currentOrganisationRegistrationDetailModel) == DirectDebitType.SEPA) {
            if ((currentOrganisationRegistrationDetailModel.Country ?? "") == "NL")
                this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['anbi'] } }])
            else {
                this.loading = true;
                this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['complete'] } }])
            }
        }
    }
}
