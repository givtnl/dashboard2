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

  ngOnInit() {
    this.additionalInformationCommand = this.route.snapshot.data.additionalInformation;
    this.form = this.formBuilder.group({
      singleCollectionDetails: this.mapDetailsToFormArray(this.additionalInformationCommand.singleCollectionService.details || [])
    });
  }


  mapDetail(detail: PreboardingCollectionDetail = null): FormGroup {
    return this.formBuilder.group({
      quantity: [detail ? detail.quantity : 0, [Validators.min(1)]],
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
    this.preboardingStateService.currentAdditionalInformation = this.additionalInformationCommand;
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const numberOfVisitorsErrors = this.form.get('numberOfVisitors').errors;
    const numberOfCollectionBagsErrors = this.form.get('numberOfCollectionBags').errors;

    if (numberOfVisitorsErrors) {
      if (numberOfVisitorsErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.number-of-visitors-required'));
      }
    }
    if (numberOfCollectionBagsErrors) {
      if (numberOfCollectionBagsErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.number-of-collectionbags-required'));
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
