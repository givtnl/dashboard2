import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-giftaid-organisation-details-charity-number',
  templateUrl: './giftaid-organisation-details-charity-number.component.html',
  styleUrls: ['./giftaid-organisation-details-charity-number.component.scss']
})
export class GiftaidOrganisationDetailsCharityNumberComponent implements OnInit {

  public form: FormGroup
  public loading = false
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translationService: TranslateService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      charityNumber: [null, [Validators.required]]
    });
  }
  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    // this.stateService.currentCharityNumber = this.form.value.charityNumber;

    this.loading = true;
    this.router
      .navigate(['/', 'onboarding', 'gift-aid', { outlets: { 'onboarding-outlet': [''] } }])
      .finally(() => (this.loading = false));
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
