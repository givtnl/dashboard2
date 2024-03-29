import { Component, OnDestroy, OnInit } from '@angular/core';
import { PreboardingFormattingService } from '../services/preboarding-formatting.service';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { CollectGroupsService } from 'src/app/collect-groups/services/collect-groups.service';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { OnboardingNewUsersService } from 'src/app/onboarding/new-users/services/onboarding-new-users.service';
import { PreboardingStepListModel } from './models/preboarding-step-list.model';
import { tap, switchMap, catchError, retry, delayWhen, concatMap, takeUntil } from 'rxjs/operators';
import { of, Observable, EMPTY, forkJoin, Subject, fromEvent } from 'rxjs';
import { CreatedCollectGroupResponse } from 'src/app/collect-groups/models/created-collect-group-response.model';
import { CreatedResponseModel } from 'src/app/infrastructure/models/response.model';
import { CollectionMediumType } from 'src/app/collect-groups/models/collection-medium-list.model';
import { OrganisationType } from '../models/organisation-type.enum';
import { OrganisationRegistrationProgress } from 'src/app/organisations/models/organisation-registration-progress';
import { ActivatedRoute } from '@angular/router';
import { RelationShipService } from 'src/app/account/relationships/services/relationship.service';
import mixpanel from 'mixpanel-browser';
import { LocationStrategy } from "@angular/common";

@Component({
  selector: "app-preboarding-details-complete",
  templateUrl: "./preboarding-details-complete.component.html",
  styleUrls: [
    "./preboarding-details-complete.component.scss",
    "../../preboarding/preboarding.module.scss",
  ],
})
export class PreboardingDetailsCompleteComponent implements OnInit, OnDestroy {
  public steps = new Array<PreboardingStepListModel>();
  private ngUnsubscribe = new Subject<void>();
  public country: string;
  public hasFailedSteps(): boolean {
    return (
      this.steps && this.steps.some((x) => x.loading === false && x.failed)
    );
  }
  public hasLoadingSteps(): boolean {
    return this.steps && this.steps.some((x) => x.loading);
  }
  public isCompleted(): boolean {
    return (
      this.steps &&
      this.steps.filter((x) => x.success && x.success === true).length ===
        this.steps.length
    );
  }

  constructor(
    private formattingService: PreboardingFormattingService,
    private activatedRoute: ActivatedRoute,
    private relationshipService: RelationShipService,
    private organisationService: OrganisationsService,
    private collectGroupService: CollectGroupsService,
    private location: LocationStrategy,
    private preboardingStateService: PreboardingStateService,
    private onboardingNewUserService: OnboardingNewUsersService
  ) {
    history.pushState(null, null, window.location.href);
  }

  ngOnInit(): void {
    this.disableBrowserBackwardsNavigation();
    this.country = this.preboardingStateService.organisationDetails.country;
    this.steps = this.activatedRoute.snapshot.data.steps;
    this.start();
  }

  disableBrowserBackwardsNavigation() {
    // check if back or forward button is pressed.
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }
  // Gets the current collectgroup, or creates one if none does exist
  start(): void {
    this.collectGroupService
      .getAll(this.preboardingStateService.organisationDetails.organisationId)
      .pipe(catchError(() => this.genericError(0)))
      .pipe(
        switchMap((results) =>
          results && results.length > 0
            ? of({
                Result: {
                  Id: results[0].Id,
                  Namespace: results[0].Namespace,
                },
              })
            : this.collectGroupService
                .create(
                  this.preboardingStateService.organisationDetails
                    .organisationId,
                  this.preboardingStateService.currentCollectGroupDetails
                )
                .pipe(
                  takeUntil(this.ngUnsubscribe),
                  catchError(() => this.genericError(0))
                )
        )
      )
      .subscribe((createdOrRetrievedCollectGroupResponse) => {
        this.handleStep(0);
        this.country && this.country.toLowerCase() === "us"
          ? this.stepFive(createdOrRetrievedCollectGroupResponse)
          : this.stepTwo(createdOrRetrievedCollectGroupResponse);
      });
  }
  // gets or creates collectionMediums and optionally created church service missed codes
  stepTwo(
    createdOrRetrievedCollectGroup: CreatedResponseModel<CreatedCollectGroupResponse>
  ): void {
    this.collectGroupService
      .getCollectionMediums(
        this.preboardingStateService.organisationDetails.organisationId,
        createdOrRetrievedCollectGroup.Result.Id
      )
      .pipe(
        takeUntil(this.ngUnsubscribe),
        catchError(() => this.genericError(1)),
        // export to KDGM if no qr codes currently present
        tap((results) =>
          results.length === 0
            ? this.stepThree(createdOrRetrievedCollectGroup)
            : EMPTY
        ),
        // finish the KDGM step if there are already codes!
        tap((results) => (results.length > 0 ? this.handleStep(2) : EMPTY)),
        switchMap((results: any[]) =>
          results.length === 0
            ? this.collectGroupService
                .addCollectionMedium(
                  this.preboardingStateService.organisationDetails
                    .organisationId,
                  createdOrRetrievedCollectGroup.Result.Id
                )
                .pipe(
                  delayWhen((createdQrCode) =>
                    this.collectGroupService.exportCollectionMedium(
                      this.preboardingStateService.organisationDetails
                        .organisationId,
                      createdOrRetrievedCollectGroup.Result.Id,
                      createdQrCode.Result,
                      this.preboardingStateService.organisationDetails.language,
                      null,
                      null,
                      null,
                      "cdn/qr"
                    )
                  )
                )
                .pipe(catchError(() => this.genericError(1)))
            : of({
                Result: results[0].MediumId,
              })
        )
      )
      .subscribe((createdOrRetrievedCollectionMedium) => {
        this.handleStep(1);
        this.stepFour(
          createdOrRetrievedCollectionMedium,
          createdOrRetrievedCollectGroup
        );
      });
  }
  // OPTIONAL , exports QR Codes for Church Services Dearly Missed
  stepThree(
    createdOrRetrievedCollectGroup: CreatedResponseModel<CreatedCollectGroupResponse>
  ): void {
    forkJoin(
      [CollectionMediumType.QrCodeWebOnly, CollectionMediumType.QrCodeKDGM].map(
        (qrType) =>
          this.collectGroupService
            .addCollectionMedium(
              this.preboardingStateService.organisationDetails.organisationId,
              createdOrRetrievedCollectGroup.Result.Id,
              qrType
            )
            .pipe(
              takeUntil(this.ngUnsubscribe),
              catchError(() => this.genericError(2)),
              switchMap((createdQrCode) =>
                this.collectGroupService.exportCollectionMedium(
                  this.preboardingStateService.organisationDetails
                    .organisationId,
                  createdOrRetrievedCollectGroup.Result.Id,
                  createdQrCode.Result,
                  this.preboardingStateService.organisationDetails.language,
                  null,
                  null,
                  null,
                  "cdn/qr"
                )
              )
            )
      )
    ).subscribe((x) => this.handleStep(2));
  }
  // Exports Collection Mediums By Mail
  stepFour(
    createdOrRetrievedCollectionMedium: CreatedResponseModel<string>,
    createdOrRetrievedCollectGroup: CreatedResponseModel<CreatedCollectGroupResponse>
  ): void {
    var templateName = `PreboardCompleted${
      OrganisationType[this.preboardingStateService.organisationDetails.type]
    }`;
    this.collectGroupService
      .exportCollectionMedium(
        this.preboardingStateService.organisationDetails.organisationId,
        createdOrRetrievedCollectGroup.Result.Id,
        createdOrRetrievedCollectionMedium.Result,
        this.preboardingStateService.organisationDetails.language,
        this.preboardingStateService.organisationDetails.emailAddress,
        this.preboardingStateService.organisationDetails.organisationName,
        templateName,
        null
      )
      .pipe(retry(2))
      .pipe(catchError(() => this.genericError(3)))
      .subscribe(() => {
        this.handleStep(3);
        this.stepFive(createdOrRetrievedCollectGroup);
      });
  }
  // Invites the admins to use the dashboard
  stepFive(
    createdOrRetrievedCollectGroup: CreatedResponseModel<CreatedCollectGroupResponse>
  ): void {
    forkJoin(
      this.preboardingStateService.currentOrganisationAdminContact.map((x) =>
        this.onboardingNewUserService
          .sendRegistrationMail(createdOrRetrievedCollectGroup.Result.Id, {
            collectGroupId: createdOrRetrievedCollectGroup.Result.Id,
            language: x.language,
            email: x.email,
          })
          .pipe(
            takeUntil(this.ngUnsubscribe),
            catchError(() => this.genericError(4))
          )
      )
    ).subscribe(() => {
      let stepIndex =
        this.country && this.country.toLowerCase() === "us" ? 1 : 4;
      this.handleStep(stepIndex);
      this.stepSix();
    });
  }
  // Adds the note in teamleader and add the launch date to teamleader and the database
  stepSix(): void {
    this.organisationService
      .addNote(
        this.preboardingStateService.organisationDetails.organisationId,
        `Preboarding completed ${this.preboardingStateService.currentCollectGroupDetails.name}`,
        `${this.formattingService.formatContact(
          this.preboardingStateService.currentOrganisationContact
        )}
    ${this.formattingService.formatInfo(
      this.preboardingStateService.currentAdditionalInformation
    )}`
      )
      .pipe(
        concatMap(() =>
          this.preboardingStateService.currentSetLaunchDateCommand?.launchDate
            ? this.organisationService.addLaunchDate(
                this.preboardingStateService.organisationDetails.organisationId,
                this.preboardingStateService.currentSetLaunchDateCommand
              )
            : of({})
        )
      )
      .pipe(
        takeUntil(this.ngUnsubscribe),
        catchError(() => this.genericError(5))
      )
      .subscribe(() => {
        let stepIndex =
          this.country && this.country.toLowerCase() === "us" ? 2 : 5;
        this.handleStep(stepIndex);
        this.stepSeven();
      });
  }
  stepSeven(): void {
    if (
      this.preboardingStateService.currentCreateOrganisationshipRuleCommand &&
      this.preboardingStateService.organisationRelationship
    ) {
      this.relationshipService
        .create(
          this.preboardingStateService.currentCreateOrganisationshipRuleCommand
        )
        .pipe(
          takeUntil(this.ngUnsubscribe),
          catchError(() => this.genericError(6))
        )
        .subscribe((x) => {
          this.handleStep(6);
          this.stepEight();
        });
    } else {
      let stepIndex =
        this.country && this.country.toLowerCase() === "us" ? 3 : 6;
      this.handleStep(stepIndex);
      this.stepEight();
    }
  }
  // Updates the progress in teamleader & wrap up registration process
  stepEight(): void {
    this.organisationService
      .changeProgress(
        this.preboardingStateService.organisationDetails.organisationId,
        OrganisationRegistrationProgress.Preboarded
      )
      .pipe(
        takeUntil(this.ngUnsubscribe),
        catchError(() => this.genericError(7))
      )
      .subscribe((_) => {
        let stepIndex =
          this.country && this.country.toLowerCase() === "us" ? 4 : 7;
        this.handleStep(stepIndex);
      });
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
    if (this.steps.length == stepIndex + 1) {
      mixpanel.track(`preboarding:end${success ? "Success" : "Fail"}`);
    } else if (this.steps.length > stepIndex + 1 && !success) {
      this.steps
        .filter((step, index) => index > stepIndex)
        .forEach((step) => (step.loading = false));
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
