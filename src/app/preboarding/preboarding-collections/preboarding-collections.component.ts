import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preboarding-collections',
  templateUrl: './preboarding-collections.component.html',
  styleUrls: ['./preboarding-collections.component.scss']
})
export class PreboardingCollectionsComponent implements OnInit {
  form: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private translationService: TranslateService,
    private toastr: ToastrService,
    private preboardingStateService: PreboardingStateService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      singleCollectionService: [false],
      multipleCollectionService: [false],
      endOfServiceCollection: [false],
      communionCollection: [false],
      candleCollection: [false],
      collectionBoxes: [false]
    },{ validators: [this.atleastOneIsCheckedValidator()] })
  }

  public atleastOneIsCheckedValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      if (!Object.values(group.controls).some(control => control.value))
        return { noCollectionsSelected: true }
      return;
    }
  }
  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    alert('twa goed')
    // this.continue();
    this.router.navigate(["/preboarding/register/collection-medium-details"])
  }
  handleInvalidForm() {
    alert('twa slecht')
    // let errorMessages = new Array<Observable<string>>();
    // let resolvedErrorMessages = new Array<string>();

    // const numberOfVisitorsErrors = this.form.get('numberOfVisitors').errors;

    // if (numberOfVisitorsErrors) {
    //   if (numberOfVisitorsErrors.required) {
    //     errorMessages.push(this.translationService.get('errorMessages.number-of-visitors-required'));
    //   }
    // }

    // forkJoin(errorMessages)
    //   .pipe(tap(results => (resolvedErrorMessages = results)))
    //   .pipe(switchMap(results => this.translationService.get('errorMessages.validation-errors')))
    //   .subscribe(title =>
    //     this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
    //       enableHtml: true
    //     })
    //   );
  }
  continue() {
    // const currentSettings = this.preboardingStateService.currentOrganisationDetails;

    // currentSettings.aantalMensenInKerk  = this.form.value.numberOfVisitors;

    // this.preboardingStateService.currentOrganisationDetails = currentSettings;
    // this.preboardingStateService.validatedAndCompletedStepThree = true;
  }
}
