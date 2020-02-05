import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';
import { OnboardingOrganisationDetailsService } from '../../organisation-details/services/onboarding-organisation-details.service';
import { HttpErrorResponse } from '@angular/common/http';
import { delay, map, catchError, tap, switchMap } from 'rxjs/operators';
import { of, Observable, forkJoin, observable } from 'rxjs';

@Component({
  selector: 'app-giftaid-organisation-charity-details',
  templateUrl: './giftaid-organisation-charity-details.component.html',
  styleUrls: ['./giftaid-organisation-charity-details.component.scss']
})
export class GiftaidOrganisationDetailsCharityNumberComponent implements OnInit {

  public form: FormGroup
  public loading = false
  constructor(
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private giftAidStateService: OnboardingGiftAidStateService, private toastr: ToastrService, private translationService: TranslateService, private router: Router, private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService) { }

  ngOnInit() {
    const currentSettings = this.currentSettings();
    this.form = this.formBuilder.group({
      charityCommissionReference: [{
       value: this.currentSettings ? currentSettings.charityCommissionReference : null,
       disabled:currentSettings && currentSettings.charityCommissionReference && currentSettings.charityCommissionReference.length > 0,
      }, [Validators.required, Validators.minLength(6), Validators.maxLength(15)], this.charityCommissionNumberValidator.bind(this)],
      charityId: [this.currentSettings ? currentSettings.charityId : null, [Validators.required, Validators.maxLength(20)]],
    });
  }
  private currentSettings(): PreparedGiftAidSettings {
    // if we already did this step and the user returns to this screen, then load the previously entered settings
    // and do not reload them from our prepare endpoint as the user might altered them
    if (!this.giftAidStateService.validatedAndCompletedOrganisationDetails) {
      return this.activatedRoute.parent.snapshot.data.giftAidSettings;
    } else {
      return this.giftAidStateService.currentGiftAidSettings;
    }
  }

  public submit():void{
    this.loading = true;
    if (this.form.invalid) {
      this.handleInvalidForm();
      this.loading = false;
      return;
    }
    this.continue();
  }

  // only call this function when all of the input has been validated
  private continue(): void {
    const currentSettings = this.giftAidStateService.currentGiftAidSettings;
    currentSettings.charityCommissionReference = this.form.value.charityCommissionReference;
    currentSettings.charityId = this.form.value.charityId;
    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    // todo implement the route
    this.loading = true;
    this.router
      .navigate(['/', 'onboarding', 'giftaid', { outlets: { 'onboarding-outlet': ['organisation-details'] } }])
      .finally(() => (this.loading = false));
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const charityCommissionNumber = this.form.get('charityCommissionReference').errors;
    const charityId = this.form.get('charityId').errors;

    if(charityCommissionNumber) {
     if (charityCommissionNumber.invalidCharityNumber)
     errorMessages.push(this.translationService.get('errorMessages.test'));
    }
    
    this.loading = true;
    forkJoin(errorMessages)
      .pipe(tap(results => (resolvedErrorMessages = results)))
      .pipe(tap(results => console.log(results)))
      .pipe(switchMap(() => this.translationService.get('errorMessages.validation-errors')))
      .subscribe(title =>
        this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
          enableHtml: true
        })
      )
      .add(() => (this.loading = false));
  }

  charityCommissionNumberValidator(control: AbstractControl){
    return this.onboardingOrganisationDetailsService.get(control.value).pipe(map(response => null)).pipe(catchError(error => of({
      invalidCharityNumber:true
    })))
  }
}
