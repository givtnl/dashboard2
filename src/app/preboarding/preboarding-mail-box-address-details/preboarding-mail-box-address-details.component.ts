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
      mailBoxAddressLineOne: [null, [Validators.required]],
      mailBoxAddressLineTwo: [null, [Validators.required]], 
      mailBoxAddressLineThree: [null, []],
      mailBoxAddressLineFour: [null, []],
      mailBoxAddressZipCode: [null, [Validators.required]]
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

    const mailBoxAddressLineOneErrors = this.form.get('mailBoxAddressLineOne').errors;
    const mailBoxAddressLineTwoErrors = this.form.get('mailBoxAddressLineTwo').errors;
    // const mailBoxAddressLineThreeErrors = this.form.get('mailBoxAddressLineThree').errors;
    // const mailBoxAddressLineFourErrors = this.form.get('mailBoxAddressLineFour').errors;
    const mailBoxAddressZipcodeErrors = this.form.get('mailBoxAddressZipCode').errors;

    if (mailBoxAddressLineOneErrors) {
      if (mailBoxAddressLineOneErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-line-one-required'));
      }
    }
    if (mailBoxAddressLineTwoErrors) {
      if (mailBoxAddressLineTwoErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-line-two-required'));
      }
    }
    if (mailBoxAddressZipcodeErrors) {
      if (mailBoxAddressZipcodeErrors.required) {
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
