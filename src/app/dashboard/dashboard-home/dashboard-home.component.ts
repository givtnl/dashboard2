import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { CollectGroupDashboardListModel } from '../../shared/models/collect-group-side-bar-list.model';
import { DashboardService } from "../../shared/services/dashboard.service";
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { EMPTY, of, Subject } from "rxjs";
import { OnboardingGiftAidService } from "src/app/onboarding/giftaid/services/onboarding-giftaid.service";
import { switchMap, map, takeUntil } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { DirectDebitTypeHelper } from "src/app/shared/helpers/direct-debit-type.helper";
import { OrganisationRegistrationStep } from "src/app/organisations/models/organisation-registration-step";
import { OrganisationRegistrationStatus } from "src/app/organisations/enums/organisationregistrationstatus.enum";
import { OrganisationDetailModel } from "src/app/organisations/models/organisation-detail.model";
import { OnboardingWePayService } from "src/app/onboarding/organisation-details/services/onboarding-wepay.service";

@Component({
  selector: "app-dashboard-home",
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.scss"],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  public loading = false;
  public collectGroups = new Array<CollectGroupDashboardListModel>();
  private ngUnsubscribe = new Subject<void>();
  public showGiftAidButton = false;
  public onboardingStepsComplete: boolean = false;

  constructor(
    public applicationStateService: ApplicationStateService,
    private organisationService: OrganisationsService,
    private giftAidService: OnboardingGiftAidService,
    private dashboardService: DashboardService,
    private onboardingWePayService: OnboardingWePayService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.dashboardService.currentOrganisation =
      this.route.snapshot.data.organisation;
    this.dashboardService.currentCollectGroup = null;
    this.dashboardService
      .getCollectGroups()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => (this.collectGroups = x));
    await this.determineIfGiftAidShouldBeEnabled();
    this.finishPreboardingForUSOrganisation();
  }

  finishPreboardingForUSOrganisation() {
    if (
      this.dashboardService.currentOrganisation.Country &&
      this.dashboardService.currentOrganisation.Country.toLowerCase() === "us"
    ) {
      let organisationId = this.dashboardService.currentOrganisation.Id;
      this.organisationService
        .getById(organisationId)
        .pipe(
          takeUntil(this.ngUnsubscribe),
          switchMap((organisation: OrganisationDetailModel) => {
            if (organisation.PaymentProviderIdentification === null) {
              return this.onboardingWePayService.completePreboarding(
                organisationId
              );
            }
            return EMPTY;
          })
        )
        .subscribe((_) => {
          console.log("Preboarding complete!");
        });
    }
  }

  getIconForCollectGroupType(collectGroupType: number): string {
    switch (collectGroupType) {
      case 0:
        return "fa-church";
      case 1:
        return "fa-bullhorn";
      case 2:
        return "fa-guitar";
      case 3:
        return "fa-hand-holding-heart";
      default:
        return "fa-heart";
    }
  }

  getBackgroundForCollectGroupType(collectGroupType: number): string {
    switch (collectGroupType) {
      case 0:
        return "church";
      case 1:
        return "campaign";
      case 2:
        return "artist";
      case 3:
        return "charity";
      default:
        return "charity";
    }
  }

  tileClicked(tileName: string) {
    this.dashboardService.currentCollectGroup = this.collectGroups.find(
      (x) => x.Name == tileName
    );
    this.router.navigate([
      "/",
      "dashboard",
      "root",
      { outlets: { "dashboard-outlet": ["collect-group-home"] } },
    ]);
  }

  async determineIfGiftAidShouldBeEnabled(): Promise<void> {
    const currentOrganisationId =
      this.applicationStateService.currentTokenModel.OrganisationAdmin;
    let registrationStatus = await this.organisationService
      .getRegistrationStatus(currentOrganisationId)
      .toPromise();
    if (
      !registrationStatus.some(
        (x) =>
          x.OrganisationRegistrationStatus ==
          OrganisationRegistrationStatus.AddGiftAidSettings
      )
    ) {
      this.showGiftAidButton = false;
      return;
    } else {
      this.giftAidService
        .isGiftAidEligble(currentOrganisationId)
        // if we could enable gift aid, means we are UK and a valid organisation
        .pipe(
          switchMap((canEnable) =>
            canEnable === true
              ? // retrieve the organisation and check if the user actually disabled it
                this.organisationService
                  .getById(currentOrganisationId)
                  .pipe(
                    map((organisation) => organisation.GiftAidEnabled === false)
                  )
              : of(false)
          )
        )
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((enabled) => (this.showGiftAidButton = enabled));
    }
  }

  isOnboardingComplete(event) {
    this.onboardingStepsComplete = event;
    this.loading = false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
