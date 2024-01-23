import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, Subject } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreateOrganisationContactCommand } from 'src/app/organisations/models/commands/create-organisation-contact.command';
import { postCodeBACSValidator } from 'src/app/shared/validators/postcode-BACS.validator';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';

@Component({
    selector: 'app-preboarding-mail-box-address-details',
    templateUrl: './preboarding-mail-box-address-details.component.html',
    styleUrls: ['./preboarding-mail-box-address-details.component.scss', '../../preboarding/preboarding.scss']
})
export class PreboardingMailBoxAddressDetailsComponent implements OnInit, OnDestroy {
    public form: UntypedFormGroup
    public contact: CreateOrganisationContactCommand;
    public country: String;
    private ngUnsubscribe = new Subject<void>();
    constructor(
        private route: ActivatedRoute,
        private formBuilder: UntypedFormBuilder,
        private translationService: TranslateService,
        private toastr: ToastrService,
        private preboardingStateService: PreboardingStateService,
        private router: Router) { }

    ngOnInit() {
        this.contact = this.route.snapshot.data.contact;

        if (this.preboardingStateService.organisationDetails)
            this.country = this.preboardingStateService.organisationDetails.country
        else this.country = "NL"


        this.form = this.formBuilder.group({
            mailBoxAddress: [this.contact ? this.contact.address : null, [Validators.required, notNullOrEmptyValidator(), Validators.minLength(2)]],
            mailBoxCity: [this.contact ? this.contact.city : null, [Validators.required, notNullOrEmptyValidator(), Validators.minLength(2)]],
            mailBoxZipCode: [this.contact ? this.contact.postCode : null, ["GB", "GG", "GE"].some(x => x == this.country) ? [Validators.required, postCodeBACSValidator(), notNullOrEmptyValidator()] : [Validators.required, Validators.minLength(2), notNullOrEmptyValidator()]],
            mailBoxTelephone: [this.contact ? this.contact.telephone : null, [Validators.required, notNullOrEmptyValidator(), Validators.minLength(6)]],
            mailBoxComments: [this.contact ? this.contact.comments : null]
        });
        if(this.country === 'US'){
            this.form.addControl(
              "mailBoxState",
              new UntypedFormControl(this.contact ? this.contact.state : null, [
                Validators.required,
                notNullOrEmptyValidator(),
              ])
            );
        }
    }


    submit() {
        if (this.form.invalid) {
            this.handleInvalidForm();
            return;
        }
        this.continue();
        this.router.navigate(["/preboarding/register/visitors"])
    }

    continue() {
        this.contact.address = this.form.value.mailBoxAddress.trim();
        this.contact.city = this.form.value.mailBoxCity.trim();
        if (this.form.value.mailBoxComments) //This is not required so can be null
            this.contact.comments = this.form.value.mailBoxComments.trim();
        this.contact.postCode = this.form.value.mailBoxZipCode.trim();
        this.contact.telephone = this.form.value.mailBoxTelephone.trim();
        if(this.country === 'US'){
            this.contact.state = this.form.value.mailBoxState.trim();
        }
        this.preboardingStateService.currentOrganisationContact = this.contact;
    }

    handleInvalidForm() {
        let errorMessages = new Array<Observable<string>>();
        let resolvedErrorMessages = new Array<string>();

        const mailBoxAddressErrors = this.form.get('mailBoxAddress').errors;
        const mailBoxCityErrors = this.form.get('mailBoxCity').errors;
        const mailBoxZipcodeErrors = this.form.get('mailBoxZipCode').errors;
        const mailBoxTelephoneErrors = this.form.get('mailBoxTelephone').errors;
        const mailBoxStateErrors = (this.country === 'US') ? this.form.get('state').errors: null

        if (mailBoxAddressErrors) {
            if (mailBoxAddressErrors.trimEmptyValue || mailBoxAddressErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.address-required'));
            }
        }
        if (mailBoxCityErrors) {
            if (mailBoxCityErrors.trimEmptyValue || mailBoxCityErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.address-city-required'));
            }
        }
        if (mailBoxZipcodeErrors) {
            if (mailBoxZipcodeErrors.trimEmptyValue || mailBoxZipcodeErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.address-zipcode-required'));
            } else if (mailBoxZipcodeErrors.minlength || mailBoxZipcodeErrors.invalidPostCode) {
                errorMessages.push(this.translationService.get('errorMessages.postcode-invalid'));
            }
        }

        if (mailBoxTelephoneErrors) {
            if (mailBoxTelephoneErrors.trimEmptyValue || mailBoxTelephoneErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.telephone-required'));
            } else if (mailBoxTelephoneErrors.minlength) {
                errorMessages.push(this.translationService.get('errorMessages.telephone-invalid'));
            }
        }

        if(this.country === 'US' && mailBoxStateErrors){
            if (mailBoxStateErrors.trimEmptyValue || mailBoxStateErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.address-state-required'));
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

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
