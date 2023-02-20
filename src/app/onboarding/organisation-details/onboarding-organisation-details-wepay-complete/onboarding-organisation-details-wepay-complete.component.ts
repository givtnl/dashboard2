import { LocationStrategy } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import mixpanel from "mixpanel-browser";
import { EMPTY, forkJoin, Observable, of, Subject } from "rxjs";
import {
  catchError,
  delayWhen,
  map,
  retry,
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";
import { CollectGroupListModel } from "src/app/collect-groups/models/collect-group-list.model";
import { CollectionMediumType } from "src/app/collect-groups/models/collection-medium-list.model";
import { CreatedCollectGroupResponse } from "src/app/collect-groups/models/created-collect-group-response.model";
import { CollectGroupsService } from "src/app/collect-groups/services/collect-groups.service";
import { CreatedResponseModel } from "src/app/infrastructure/models/response.model";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { OrganisationDetailModel } from "src/app/organisations/models/organisation-detail.model";
import { OrganisationsService } from "src/app/organisations/services/organisations.service";
import { OrganisationType } from "src/app/preboarding/models/organisation-type.enum";
import { PreboardingStateService } from "src/app/preboarding/services/preboarding-state.service";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { OnboardingStepListModel } from "../models/onboarding-step-list.model";

@Component({
  selector: "app-onboarding-organisation-details-complete",
  templateUrl:
    "./onboarding-organisation-details-wepay-complete.component.html",
  styleUrls: [
    "../../onboarding.module.scss",
    "./onboarding-organisation-details-wepay-complete.component.scss",
  ],
})
export class OnboardingOrganisationDetailsWepayCompleteComponent
  implements OnInit
{
  public steps = new Array<OnboardingStepListModel>();
  private ngUnsubscribe = new Subject<void>();
  public country: string;
  public collectGroupModel: CollectGroupListModel;
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
    private activatedRoute: ActivatedRoute,
    private collectGroupService: CollectGroupsService,
    private location: LocationStrategy,
    private dashboardService: DashboardService,
    private applicationStateService: ApplicationStateService,
    private organisationService: OrganisationsService
  ) {
    history.pushState(null, null, window.location.href);
  }

  ngOnInit(): void {
    this.disableBrowserBackwardsNavigation();
    this.steps = this.activatedRoute.snapshot.data.steps;
    console.log({ steps: this.steps });
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
      .getAll(this.dashboardService.currentOrganisation.Id)
      .pipe(
        catchError(() => this.genericError(0)),
        tap(
          (results: CollectGroupListModel[]) =>
            (this.collectGroupModel = results[0])
        ),
        map((results: CollectGroupListModel[]) => {
          console.log(results);
          return {
            Result: {
              Id: results[0].Id,
              Namespace: results[0].Namespace,
            },
          };
        })
      )
      .subscribe((createdOrRetrievedCollectGroupResponse) => {
        this.handleStep(0);
        this.stepTwo(createdOrRetrievedCollectGroupResponse);
      });
  }
  // gets or creates collectionMediums and optionally created church service missed codes
  stepTwo(createdOrRetrievedCollectGroup): void {
    console.log(createdOrRetrievedCollectGroup);
    console.log(this.dashboardService.currentOrganisation.Id);
    console.log(this.collectGroupModel);
    this.collectGroupService
      .getCollectionMediums(
        this.dashboardService.currentOrganisation.Id,
        createdOrRetrievedCollectGroup.Result.Id
      )
      .pipe(
        takeUntil(this.ngUnsubscribe),
        catchError(() => this.genericError(1)),
        // export to KDGM if no qr codes currently present
        tap((results: any[]) =>
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
                  this.dashboardService.currentOrganisation.Id,
                  createdOrRetrievedCollectGroup.Result.Id
                )
                .pipe(
                  delayWhen((createdQrCode) =>
                    this.collectGroupService.exportCollectionMedium(
                      this.dashboardService.currentOrganisation.Id,
                      createdOrRetrievedCollectGroup.Result.Id,
                      createdQrCode.Result,
                      "en",
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
      .subscribe(
        (createdOrRetrievedCollectionMedium: CreatedResponseModel<string>) => {
          this.handleStep(1);
          this.stepFour(
            createdOrRetrievedCollectionMedium,
            createdOrRetrievedCollectGroup
          );
        }
      );
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
              this.dashboardService.currentOrganisation.Id,
              createdOrRetrievedCollectGroup.Result.Id,
              qrType
            )
            .pipe(
              takeUntil(this.ngUnsubscribe),
              catchError(() => this.genericError(2)),
              switchMap((createdQrCode: any) =>
                this.collectGroupService.exportCollectionMedium(
                  this.dashboardService.currentOrganisation.Id,
                  createdOrRetrievedCollectGroup.Result.Id,
                  createdQrCode.Result,
                  "en",
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
    this.organisationService
      .getById(this.dashboardService.currentOrganisation.Id)
      .pipe(
        switchMap((organisation: OrganisationDetailModel) => {
          var templateName = `PreboardCompleted${
            OrganisationType[organisation.OrganisationType]
          }`;
          return this.collectGroupService
            .exportCollectionMedium(
              this.dashboardService.currentOrganisation.Id,
              createdOrRetrievedCollectGroup.Result.Id,
              createdOrRetrievedCollectionMedium.Result,
              "en",
              this.applicationStateService.currentUserModel.Email,
              this.dashboardService.currentOrganisation.Name,
              templateName,
              null
            )
            .pipe(retry(2))
            .pipe(catchError(() => this.genericError(3)));
        })
      )
      .subscribe(() => {
        this.handleStep(3);
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
      mixpanel.track(`onboarding:end${success ? "Success" : "Fail"}`);
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
