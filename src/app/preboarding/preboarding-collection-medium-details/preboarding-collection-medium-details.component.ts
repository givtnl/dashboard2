import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, Subject } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreatePreboardingAdditionalInformationCommand, PreboardingCollectionDetail } from '../models/create-preboarding-additional-information.command';

@Component({
  selector: 'app-preboarding-collection-medium-details',
  templateUrl: './preboarding-collection-medium-details.component.html',
  styleUrls: ['./preboarding-collection-medium-details.component.scss', '../../preboarding/preboarding.module.scss',]
})
export class PreboardingCollectionMediumDetailsComponent implements OnInit,OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  public form: FormGroup
  public additionalInformationCommand: CreatePreboardingAdditionalInformationCommand;
  formSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translationService: TranslateService,
    private toastr: ToastrService,
    private preboardingStateService: PreboardingStateService,
    private router: Router) {
  }

  ngOnInit() {
    this.additionalInformationCommand = this.route.snapshot.data.additionalInformation;
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
            [this.mapDetail() as PreboardingCollectionDetail])) : null
    });
  }

  submit() {
    this.formSubmitted = true;
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
    this.preboardingStateService.currentAdditionalInformation = this.additionalInformationCommand;
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    if (this.form.status == "INVALID")
      errorMessages.push(this.translationService.get('errorMessages.fill-in-all-details'));

    forkJoin(errorMessages)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(results => (resolvedErrorMessages = results)),
        switchMap(results => this.translationService.get('errorMessages.validation-errors')))
      .subscribe(title =>
        this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
          enableHtml: true
        })
      );
  }

  mapDetail(detail: PreboardingCollectionDetail = null): FormGroup {
    return this.formBuilder.group({
      quantity: [detail ? detail.quantity : null, [Validators.required, Validators.min(0)]],
      collectionType: [detail ? detail.collectionType : null, [Validators.required, this.collectionTypeSelectionChanged()]]
    })
  }

  mapDetailsToFormArray(details: PreboardingCollectionDetail[]): FormArray {
    return this.formBuilder.array(details.map(x => this.mapDetail(x)));
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
  private collectionTypeSelectionChanged(): ValidatorFn {
    /* To prevent submitting the form */
    /* Showing red border around dropdown when invalid happens in html. */
    return (group: FormGroup): ValidationErrors => {
      if (group.value == null)
        return { collectionTypeNotSelected: true }
      return null;
    }
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
