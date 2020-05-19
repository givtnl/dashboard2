import { Component, OnInit } from '@angular/core';
import { PreboardingFormattingService } from '../services/preboarding-formatting.service';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { CollectGroupsService } from 'src/app/collect-groups/services/collect-groups.service';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { OnboardingNewUsersService } from 'src/app/onboarding/new-users/services/onboarding-new-users.service';
import { PreboardingStepListModel } from './models/preboarding-step-list.model';
import { tap, switchMap, map, catchError, retry } from 'rxjs/operators';
import { of, Observable, EMPTY, forkJoin } from 'rxjs';
import { CreatedCollectGroupResponse } from 'src/app/collect-groups/models/created-collect-group-response.model';
import { CreatedResponseModel } from 'src/app/infrastructure/models/response.model';
import { CollectionMediumType } from 'src/app/collect-groups/models/collection-medium-list.model';
import { OrganisationType } from '../models/organisation-type.enum';
import { OrganisationRegistrationProgress } from 'src/app/organisations/models/organisaition-registration-progress';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preboarding-details-complete',
  templateUrl: './preboarding-details-complete.component.html',
  styleUrls: ['./preboarding-details-complete.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingDetailsCompleteComponent implements OnInit {
  public steps = new Array<PreboardingStepListModel>();

  public hasFailedSteps(): boolean {
    return this.steps && this.steps.some(x => x.loading === false && x.failed);
  }
  public hasLoadingSteps(): boolean {
    return this.steps && this.steps.some(x => x.loading);
  }
  public isCompleted(): boolean {
    return this.steps && this.steps.filter(x => x.success && x.success === true).length === this.steps.length;
  }

  constructor(private formattingService: PreboardingFormattingService,
    private activatedRoute: ActivatedRoute,
    private organisationService: OrganisationsService,
    private collectGroupService: CollectGroupsService,
    private preboardingStateService: PreboardingStateService,
    private onboardingNewUserService: OnboardingNewUsersService) { }


  ngOnInit(): void {
    this.steps = this.activatedRoute.snapshot.data.steps;
    this.start();
  }
  // Updates the organisation
  start(): void {
    this.organisationService.getById(this.preboardingStateService.organisationDetails.organisationId)
      .pipe(catchError(() => this.genericError(0)))
      .pipe(map((toUpdateOrganisation) => {
        return {
          Id: toUpdateOrganisation.Guid,
          Name: toUpdateOrganisation.Name,
          AddressLine1: toUpdateOrganisation.AddressLine1,
          AddressLine2: toUpdateOrganisation.AddressLine2,
          AddressLine3: toUpdateOrganisation.AddressLine3,
          AddressLine4: toUpdateOrganisation.AddressLine4,
          AddressLine5: toUpdateOrganisation.AddressLine5,
          PostalCode: toUpdateOrganisation.PostalCode,
          ParentId: null,
          CharityCommissionNumber: null
        }
      }))
      .pipe(switchMap(command => this.organisationService.update(command.Id, command)))
      .pipe(retry(2))
      .pipe(catchError(() => this.genericError(0)))
      .subscribe(() => {
        this.handleStep(0);
        this.stepOne();
      });
  }
  // Gets the current collectgroup, or creates one if none does exist
  stepOne(): void {
    this.collectGroupService.getAll(this.preboardingStateService.organisationDetails.organisationId)
      .pipe(catchError(() => this.genericError(1)))
      .pipe(switchMap(results => results && results.length > 0 ? of({
        Result: {
          Id: results[0].Id,
          Namespace: results[0].Namespace
        }
      }) : this.collectGroupService
        .create(this.preboardingStateService.organisationDetails.organisationId, this.preboardingStateService.currentCollectGroupDetails)
        .pipe(catchError(() => this.genericError(1)))))
      .subscribe(createdOrRetrievedCollectGroupResponse => {
        this.handleStep(1);
        this.stepTwo(createdOrRetrievedCollectGroupResponse);
      });
  }
  // gets or creates collectionMediums and optionally created church service missed codes
  stepTwo(createdOrRetrievedCollectGroup: CreatedResponseModel<CreatedCollectGroupResponse>): void {
    this.collectGroupService
      .getCollectionMediums(this.preboardingStateService.organisationDetails.organisationId, createdOrRetrievedCollectGroup.Result.Id)
      .pipe(catchError(() => this.genericError(2)))
      // export to KDGM if no qr codes currently present
      .pipe(tap(results => results.length === 0 ? this.stepThree(createdOrRetrievedCollectGroup) : EMPTY))
      // finish the KDGM step if there are already codes!
      .pipe(tap(results => results.length > 0 ? this.handleStep(3) : EMPTY))
      .pipe(switchMap(results => results.length === 0 ? this.collectGroupService.addCollectionMedium(this.preboardingStateService.organisationDetails.organisationId, createdOrRetrievedCollectGroup.Result.Id) : of({
        Result: results[0].MediumId
      })))
      .pipe(catchError(() => this.genericError(2)))
      .subscribe(createdOrRetrievedCollectionMedium => {
        this.handleStep(2);
        this.stepFour(createdOrRetrievedCollectionMedium, createdOrRetrievedCollectGroup);
      })
  }
  // OPTIONAL , exports QR Codes for Church Services Dearly Missed
  stepThree(createdOrRetrievedCollectGroup: CreatedResponseModel<CreatedCollectGroupResponse>): void {
    forkJoin([CollectionMediumType.QrCodeWebOnly, CollectionMediumType.QrCodeKDGM]
      .map(qrType => this.collectGroupService
        .addCollectionMedium(this.preboardingStateService.organisationDetails.organisationId, createdOrRetrievedCollectGroup.Result.Id, qrType)
        .pipe(catchError(() => this.genericError(3)))
        .pipe(switchMap(createdQrCode => this.collectGroupService.exportCollectionMedium(
          this.preboardingStateService.organisationDetails.organisationId,
          createdOrRetrievedCollectGroup.Result.Id,
          createdQrCode.Result,
          this.preboardingStateService.organisationDetails.language,
          null,
          null,
          null,
          "cdn/qr"
        )))
      ));
  }
  // Exports Collection Mediums By Mail
  stepFour(createdOrRetrievedCollectionMedium: CreatedResponseModel<string>, createdOrRetrievedCollectGroup: CreatedResponseModel<CreatedCollectGroupResponse>): void {
    var templateName = `PreboardCompleted${OrganisationType[this.preboardingStateService.organisationDetails.type]}`
    this.collectGroupService.exportCollectionMedium(
      this.preboardingStateService.organisationDetails.organisationId,
      createdOrRetrievedCollectGroup.Result.Id,
      createdOrRetrievedCollectionMedium.Result,
      this.preboardingStateService.organisationDetails.language,
      this.preboardingStateService.organisationDetails.emailAddress,
      this.preboardingStateService.organisationDetails.organisationName,
      templateName,
      null
    )
      .pipe(catchError(() => this.genericError(4)))
      .subscribe(() => {
        this.handleStep(4);
        this.stepFive(createdOrRetrievedCollectGroup);
      });
  }
  // Invites the admins to use the dashboard
  stepFive(createdOrRetrievedCollectGroup: CreatedResponseModel<CreatedCollectGroupResponse>): void {
    forkJoin(this.preboardingStateService.currentOrganisationAdminContact.map(x =>
      this.onboardingNewUserService.sendRegistrationMail(createdOrRetrievedCollectGroup.Result.Id, {
        collectGroupId: createdOrRetrievedCollectGroup.Result.Id,
        language: x.language,
        email: x.email
      }).pipe(catchError(() => this.genericError(5)))
    )).subscribe(() => {
      this.handleStep(5);
      this.stepSix();
    })
  }
  // Adds the note in teamleader
  stepSix(): void {
    this.organisationService
      .addNote(this.preboardingStateService.organisationDetails.organisationId, 'Preboarding completed',
        `${this.formattingService.formatContact(this.preboardingStateService.currentOrganisationContact)}
    ${this.formattingService.formatInfo(this.preboardingStateService.currentAdditionalInformation)}`)
      .pipe(catchError(() => this.genericError(6)))
      .subscribe(() => {
        this.handleStep(6);
        this.stepSeven();
      })
  }
  // Updates the progress in teamleader
  stepSeven(): void {
    this.organisationService
      .changeProgress(this.preboardingStateService.organisationDetails.organisationId, OrganisationRegistrationProgress.Preboarded)
      .pipe(catchError(() => this.genericError(7)))
      .subscribe(() => this.handleStep(7));
  }
  private genericError(stepIndex: number): Observable<never> {
    this.handleStep(stepIndex, false);
    return EMPTY;
  }
  handleStep(stepIndex: number, success: boolean = true): void {
    this.steps[stepIndex].loading = false;
    this.steps[stepIndex].success = success;
    this.steps[stepIndex].failed = !success;
    // mark the next step(s) as inconslusive ( we wont process it )
    if (success === false && this.steps.length > stepIndex + 1) {
      this.steps.filter((step, index) => index > stepIndex).forEach(step => step.loading = false);
    }
  }
}
