import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Router } from '@angular/router';
import { OrganisationRegistrationStatus } from '../../../organisations/enums/organisationregistrationstatus.enum';
import { OrganisationRegistrationStep } from 'src/app/organisations/models/organisation-registration-step';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: "app-dashboard-complete-account-widget",
  templateUrl: "./dashboard-complete-account-widget.component.html",
  styleUrls: ["./dashboard-complete-account-widget.component.scss"],
})
export class DashboardCompleteAccountWidgetComponent
  implements OnInit, OnDestroy
{
  public loading = false;
  public records = new Array<OrganisationRegistrationStep>();
  public stepOne: OrganisationRegistrationStep;
  public stepTwo: OrganisationRegistrationStep;
  private ngUnsubscribe = new Subject<void>();

  @Output() isStepsComplete = new EventEmitter<boolean>();

  constructor(
    private organisationService: OrganisationsService,
    private router: Router,
    private applicationStateService: ApplicationStateService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.organisationService
      .getRegistrationStatus(
        this.applicationStateService.currentTokenModel.OrganisationAdmin
      )
      .pipe(
        tap((steps) => {
          this.isOnboardingComplete(steps);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((records) => {
        this.records = records;
        this.stepOne = this.records.find((item) => {
          return item.DisplayOrder === 1;
        });
        this.stepTwo = this.records.find((item) => {
          return item.DisplayOrder === 2;
        });
      })
      .add(() => (this.loading = false));
  }

  public percentageComplete(): number {
    if (this.records && this.records.length > 0) {
      const totalNumberOfRecords = this.records.length;
      return (
        (100 / totalNumberOfRecords) *
        this.records.filter((x) => x.Finished).length
      );
    }
    return 0;
  }

  public percentageDegrees(toCalculatePercentage: number): number {
    return (toCalculatePercentage / 100) * 360;
  }

  public async navigate(record: OrganisationRegistrationStep): Promise<void> {
    const toNavigateRouterLinks = this.getRouterLinks(record);
    if (toNavigateRouterLinks && toNavigateRouterLinks.length > 0) {
      this.loading = true;
      await this.router
        .navigate(toNavigateRouterLinks)
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    }
  }

  public getRouterLinks(record: OrganisationRegistrationStep): Array<any> {
    switch (record.OrganisationRegistrationStatus) {
      case OrganisationRegistrationStatus.CompleteOrganisationDetails:
        return ["/", "onboarding", "organisation-details"];
      case OrganisationRegistrationStatus.AddBankAccount:
        return ["/", "onboarding", "bank-account"];
      case OrganisationRegistrationStatus.UploadBankStatement:
        return !record.InProgress
          ? ["/", "onboarding", "bank-statement"]
          : ["/", "dashboard"];
      case OrganisationRegistrationStatus.AddBankAccountHolders:
        return record.InProgress
          ? [
              "/",
              "onboarding",
              "bank-account",
              { outlets: { "onboarding-outlet": ["already-invited"] } },
            ]
          : ["/", "onboarding", "bank-account-holder"];
      case OrganisationRegistrationStatus.AddGiftAidSettings:
        return !record.InProgress
          ? ["/", "onboarding", "giftaid"]
          : ["/", "dashboard"];
      case OrganisationRegistrationStatus.AddGivtPricingConditions:
        return [
          "/",
          "onboarding",
          "organisation-details-us",
          { outlets: { "onboarding-outlet": ["terms-and-pricing"] } },
        ];
      case OrganisationRegistrationStatus.WePayKYCDetails:
        return [
          "/",
          "onboarding",
          "organisation-details-us",
          { outlets: { "onboarding-outlet": ["wepay-kyc"] } },
        ];
      case OrganisationRegistrationStatus.WePayTermsAndConditions:
        return [
          "/",
          "onboarding",
          "organisation-details-us",
          { outlets: { "onboarding-outlet": ["terms-and-conditions"] } },
        ];
      case OrganisationRegistrationStatus.WePayPayoutMethod:
        return [
          "/",
          "onboarding",
          "organisation-details-us",
          { outlets: { "onboarding-outlet": ["payout-details"] } },
        ];

      default:
        break;
    }
  }

  isOnboardingComplete(records: Array<OrganisationRegistrationStep>) {
    const orgCountry = this.dashboardService.currentOrganisation.Country;
    if (orgCountry !== "US") {
      this.isStepsComplete.emit(true);
      return;
    }
    // For US organisations, it checks to see if all the onboarding steps have been completed
    const unfinishedStep = records.find((element) => {
      return element.Finished === false;
    });
    if (!unfinishedStep) {
      this.isStepsComplete.emit(true);
    } else {
      this.isStepsComplete.emit(false);
    }
  }

  hasFirstAndSecondStepBeenCompletedForUSOrganisation(
    record: OrganisationRegistrationStep
  ): boolean {
    if (
      this.dashboardService.currentOrganisation &&
      this.dashboardService.currentOrganisation.Country !== "US"
    ) {
      return true;
    }

    // following checks is for US organisations only
    if (this.records.length > 0) {
      if (record.DisplayOrder === 1) {
        return true;
      }
      if (
        record.DisplayOrder === 2 &&
        this.stepOne != undefined &&
        this.stepOne.Finished
      ) {
        return true;
      }
      if (
        record.DisplayOrder > 2 &&
        this.stepOne != undefined &&
        this.stepOne.Finished &&
        this.stepTwo != undefined &&
        this.stepTwo.Finished
      ) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
