import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-preboarding-organisation-admin-details',
  templateUrl: './preboarding-organisation-admin-details.component.html',
  styleUrls: ['./preboarding-organisation-admin-details.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingOrganisationAdminDetailsComponent implements OnInit {

  form: FormGroup
  constructor(
    private formBuilder: FormBuilder, 
    private translationService: TranslateService, 
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      organisatorEmail: [null, [Validators.required, Validators.email]]
    });
  }
  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.router.navigate(["/preboarding/register/complete"])
  }
  
  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const organisatorEmailErrors = this.form.get('organisatorEmail').errors;

    if (organisatorEmailErrors) {
      if (organisatorEmailErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.organisator-email-required'));
      }
      if (organisatorEmailErrors.email) {
        errorMessages.push(this.translationService.get('errorMessages.email-not-an-email'));
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
