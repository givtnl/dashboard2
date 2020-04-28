import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreatePreboardingAdditionalInformationCommand, PreboardingCollectionDetail } from '../models/create-preboarding-additional-information.command';

@Component({
  selector: 'app-preboarding-collection-medium-details',
  templateUrl: './preboarding-collection-medium-details.component.html',
  styleUrls: ['./preboarding-collection-medium-details.component.scss', '../../preboarding/preboarding.module.scss',]
})
export class PreboardingCollectionMediumDetailsComponent implements OnInit {

  public form: FormGroup
  public additionalInformationCommand: CreatePreboardingAdditionalInformationCommand;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translationService: TranslateService,
    private toastr: ToastrService,
    private preboardingStateService: PreboardingStateService,
    private router: Router) {

  }


  singleCollectionDetails(): FormArray {
    return this.form.get('singleCollectionDetails') as FormArray;
  }
  multipleCollectionDetails(): FormArray {
    return this.form.get('multipleCollectionDetails') as FormArray;
  }
  endOfServiceCollectionDetails(): FormArray {
    return this.form.get('endOfServiceCollectionDetails') as FormArray;
  }
  communionCollectionDetails(): FormArray {
    return this.form.get('communionCollectionDetails') as FormArray;
  }
  candleCollectionDetails(): FormArray {
    return this.form.get('candleCollectionDetails') as FormArray;
  }
  collectionBoxesDetails(): FormArray {
    return this.form.get('collectionBoxesDetails') as FormArray;
  }
  ngOnInit() {
    this.additionalInformationCommand = this.route.snapshot.data.additionalInformation;
    console.log(this.additionalInformationCommand.singleCollectionService.details)
    this.form = this.formBuilder.group({
      singleCollectionDetails: this.additionalInformationCommand.singleCollectionService.enabled ?
      (this.mapDetailsToFormArray(this.additionalInformationCommand.singleCollectionService.details && this.additionalInformationCommand.singleCollectionService.details.length > 0 ? 
        this.additionalInformationCommand.singleCollectionService.details : 
        [this.mapDetail() as PreboardingCollectionDetail])) : null,
      multipleCollectionDetails: this.additionalInformationCommand.multipleCollectionService.enabled ? 
      (this.mapDetailsToFormArray(this.additionalInformationCommand.multipleCollectionService.details && this.additionalInformationCommand.multipleCollectionService.details.length > 0 ? 
        this.additionalInformationCommand.multipleCollectionService.details : 
        [this.mapDetail() as PreboardingCollectionDetail])) : null,
      endOfServiceCollectionDetails: this.additionalInformationCommand.endOfServiceCollection.enabled ? 
      (this.mapDetailsToFormArray(this.additionalInformationCommand.endOfServiceCollection.details && this.additionalInformationCommand.endOfServiceCollection.details.length > 0 ? 
        this.additionalInformationCommand.endOfServiceCollection.details : 
        [this.mapDetail() as PreboardingCollectionDetail])) : null,
      communionCollectionDetails: 
      this.additionalInformationCommand.communionCollection.enabled ? 
      (this.mapDetailsToFormArray(this.additionalInformationCommand.communionCollection.details && this.additionalInformationCommand.communionCollection.details.length > 0 ? 
        this.additionalInformationCommand.communionCollection.details : 
        [this.mapDetail() as PreboardingCollectionDetail])) : null,
      candleCollectionDetails: 
      this.additionalInformationCommand.candleCollection.enabled ? 
      (this.mapDetailsToFormArray(this.additionalInformationCommand.candleCollection.details && this.additionalInformationCommand.candleCollection.details.length > 0 ? 
        this.additionalInformationCommand.candleCollection.details : 
        [this.mapDetail() as PreboardingCollectionDetail])) : null,
      collectionBoxesDetails: 
      this.additionalInformationCommand.collectionBoxes.enabled ? 
      (this.mapDetailsToFormArray(this.additionalInformationCommand.collectionBoxes.details && this.additionalInformationCommand.collectionBoxes.details.length > 0 ? 
        this.additionalInformationCommand.collectionBoxes.details : 
        [this.mapDetail() as PreboardingCollectionDetail])) : null,
    });
  }


  mapDetail(detail: PreboardingCollectionDetail = null): FormGroup {
    return this.formBuilder.group({
      quantity: [detail ? detail.quantity : null, [Validators.min(1)]],
      collectionType: [detail ? detail.collectionType : null, [Validators.required]]
    })
  }

  mapDetailsToFormArray(details: PreboardingCollectionDetail[]): FormArray {
    return this.formBuilder.array(details.map(x => this.mapDetail(x)));
  }



  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.continue();
    this.router.navigate(["/preboarding/register/organisation-admin-details"])
  }

  continue() {
    this.additionalInformationCommand.singleCollectionService.details = this.singleCollectionDetails().value;
    this.additionalInformationCommand.multipleCollectionService.details = this.multipleCollectionDetails().value;
    this.additionalInformationCommand.endOfServiceCollection.details = this.endOfServiceCollectionDetails().value;
    this.additionalInformationCommand.communionCollection.details = this.communionCollectionDetails().value;
    this.additionalInformationCommand.candleCollection.details = this.candleCollectionDetails().value;
    this.additionalInformationCommand.collectionBoxes.details = this.collectionBoxesDetails().value;
    this.preboardingStateService.currentAdditionalInformation = this.additionalInformationCommand;
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    console.log(this.form)
    // const numberOfVisitorsErrors = this.form.get('numberOfVisitors').errors;
    // const numberOfCollectionBagsErrors = this.form.get('numberOfCollectionBags').errors;

    // if (numberOfVisitorsErrors) {
    //   if (numberOfVisitorsErrors.required) {
    //     errorMessages.push(this.translationService.get('errorMessages.number-of-visitors-required'));
    //   }
    // }
    // if (numberOfCollectionBagsErrors) {
    //   if (numberOfCollectionBagsErrors.required) {
    //     errorMessages.push(this.translationService.get('errorMessages.number-of-collectionbags-required'));
    //   }
    // }


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
