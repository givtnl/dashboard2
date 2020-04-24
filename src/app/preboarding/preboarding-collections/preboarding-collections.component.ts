import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CreatePreboardingAdditionalInformationCommand } from '../models/create-preboarding-additional-information.command';

@Component({
  selector: 'app-preboarding-collections',
  templateUrl: './preboarding-collections.component.html',
  styleUrls: ['./preboarding-collections.component.scss']
})
export class PreboardingCollectionsComponent implements OnInit {
  public form: FormGroup
  private additionalInformationCommand: CreatePreboardingAdditionalInformationCommand;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translationService: TranslateService,
    private toastr: ToastrService,
    private preboardingStateService: PreboardingStateService,
    private router: Router) { }

  ngOnInit() {

    this.additionalInformationCommand = this.route.snapshot.data.additionalInformation;

    this.form = this.formBuilder.group({
      singleCollectionService: [this.additionalInformationCommand && this.additionalInformationCommand.singleCollectionService ? this.additionalInformationCommand.singleCollectionService.enabled : false],
      multipleCollectionService: [this.additionalInformationCommand && this.additionalInformationCommand.multipleCollectionService ? this.additionalInformationCommand.multipleCollectionService.enabled: false],
      endOfServiceCollection: [this.additionalInformationCommand && this.additionalInformationCommand.endOfServiceCollection ? this.additionalInformationCommand.endOfServiceCollection.enabled : false],
      communionCollection: [this.additionalInformationCommand && this.additionalInformationCommand.communionCollection ? this.additionalInformationCommand.communionCollection.enabled : false],
      candleCollection: [this.additionalInformationCommand && this.additionalInformationCommand.candleCollection ? this.additionalInformationCommand.candleCollection.enabled : false],
      collectionBoxes: [this.additionalInformationCommand && this.additionalInformationCommand.collectionBoxes ? this.additionalInformationCommand.collectionBoxes.enabled : false]
    }, { validators: [this.atleastOneIsCheckedValidator()] })
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

    this.continue();
    this.router.navigate(["/preboarding/register/collection-medium-details"])
  }
  handleInvalidForm() {

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
    this.additionalInformationCommand.singleCollectionService.enabled = this.form.value.singleCollectionService;
    this.additionalInformationCommand.multipleCollectionService.enabled = this.form.value.multipleCollectionService;
    this.additionalInformationCommand.endOfServiceCollection.enabled = this.form.value.endOfServiceCollection;
    this.additionalInformationCommand.communionCollection.enabled = this.form.value.communionCollection;
    this.additionalInformationCommand.collectionBoxes.enabled = this.form.value.collectionBoxes;
    this.additionalInformationCommand.candleCollection.enabled = this.form.value.candleCollection;
    this.preboardingStateService.currentAdditionalInformation = this.additionalInformationCommand;
  }
}
