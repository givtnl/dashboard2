import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-preboarding-mail-box-address-details',
  templateUrl: './preboarding-mail-box-address-details.component.html',
  styleUrls: ['./preboarding-mail-box-address-details.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingMailBoxAddressDetailsComponent implements OnInit {
  form: FormGroup
  constructor(
    private formBuilder: FormBuilder, 
    private translationService: TranslateService, 
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      mailBoxAddress: [null, [Validators.required]],
      mailBoxCity: [null, [Validators.required]], 
      mailBoxZipCode: [null, [Validators.required]],
      mailBoxComments: [null, []]
    });
  }
  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.router.navigate(["/preboarding/register/collection-medium-details"])
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
