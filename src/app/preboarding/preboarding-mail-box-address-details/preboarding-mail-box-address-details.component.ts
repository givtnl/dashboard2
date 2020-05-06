import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreateOrganisationContactCommand } from 'src/app/organisations/models/commands/create-organisation-contact.command';
import { postCodeBACSValidator } from 'src/app/shared/validators/postcode-BACS.validator';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';

@Component({
  selector: 'app-preboarding-mail-box-address-details',
  templateUrl: './preboarding-mail-box-address-details.component.html',
  styleUrls: ['./preboarding-mail-box-address-details.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingMailBoxAddressDetailsComponent implements OnInit {
  public form: FormGroup
  public contact: CreateOrganisationContactCommand;
  private country: String;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translationService: TranslateService,
    private toastr: ToastrService,
    private preboardingStateService: PreboardingStateService,
    private router: Router) { }

  ngOnInit() {
    this.contact = this.route.snapshot.data.contact;
    
    if(this.preboardingStateService.organisationDetails)
      this.country = this.preboardingStateService.organisationDetails.country
    else this.country = "NL"

    
    this.form = this.formBuilder.group({
      mailBoxAddress: [this.contact ? this.contact.address : null, [Validators.required, notNullOrEmptyValidator()]],
      mailBoxCity: [this.contact ? this.contact.city : null, [Validators.required, notNullOrEmptyValidator()]],
      mailBoxZipCode: [this.contact ? this.contact.postCode : null, ["GB", "GG", "GE"].some(x => x == this.country) ? [Validators.required, postCodeBACSValidator(), notNullOrEmptyValidator()] : [Validators.required, Validators.minLength(2), notNullOrEmptyValidator()]],
      mailBoxComments: [this.contact ? this.contact.comments : null]
    });
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
    this.contact.comments = this.form.value.mailBoxComments.trim();
    this.contact.postCode = this.form.value.mailBoxZipCode.trim();
    this.preboardingStateService.currentOrganisationContact = this.contact;
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const mailBoxAddressErrors = this.form.get('mailBoxAddress').errors;
    const mailBoxCityErrors = this.form.get('mailBoxCity').errors;
    const mailBoxZipcodeErrors = this.form.get('mailBoxZipCode').errors;

    if (mailBoxAddressErrors) {
      if (mailBoxAddressErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-required'));
      }
    }
    if (mailBoxCityErrors) {
      if (mailBoxCityErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-city-required'));
      }
    }
    if (mailBoxZipcodeErrors) {
      if (mailBoxZipcodeErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-zipcode-required'));
      }
      if (mailBoxZipcodeErrors.minLength || mailBoxZipcodeErrors.invalidPostCode) {
        errorMessages.push(this.translationService.get('errorMessages.postcode-invalid'));
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
