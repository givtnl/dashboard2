import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preboarding-name-in-app',
  templateUrl: './preboarding-name-in-app.component.html',
  styleUrls: ['./preboarding-name-in-app.component.scss']
})
export class PreboardingNameInAppComponent implements OnInit {

  form: FormGroup
  constructor(
    private formBuilder: FormBuilder, 
    private translationService: TranslateService, 
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      inAppOrgName: [null, [Validators.required, Validators.maxLength(40)]]
    });
  }
  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.router.navigate(["/preboarding/register/mail-box-address-details"])
  }
  
  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const charityNumberErrors = this.form.get('inAppOrgName').errors;

    if (charityNumberErrors) {
      if (charityNumberErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.name-in-app-required'));
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
