import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { CollectGroupDashboardListModel } from './models/collect-group-side-bar-list.model';
import { DashboardService } from './services/dashboard.service';
import { environment } from 'src/environments/environment';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { Observable, of } from 'rxjs';
import { OnboardingGiftAidService } from 'src/app/onboarding/giftaid/services/onboarding-giftaid.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  public loading = false;
  public collectGroups = new Array<CollectGroupDashboardListModel>();

  public showGiftAidButton = false;

  constructor(
    public applicationStateService: ApplicationStateService,
    private organisationService: OrganisationsService,
    private giftAidService: OnboardingGiftAidService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.dashboardService
      .getCollectGroups()
      .subscribe(x => (this.collectGroups = x))
      .add(() => (this.loading = false));
    this.determineIfGiftAidShouldBeEnabled();
  }

  getIconForCollectGroupType(collectGroupType: number): string {
    switch (collectGroupType) {
      case 0:
        return 'fa-church';
      case 1:
        return 'fa-bullhorn';
      case 2:
        return 'fa-guitar';
      case 3:
        return 'fa-hand-holding-heart';
      default:
        return 'fa-heart';
    }
  }

  tileClicked(event: Event) {
    window.location.href = environment.oldDashboardUrl;
  }

  determineIfGiftAidShouldBeEnabled(): void {
    const currentOrganisationId = this.applicationStateService.currentTokenModel.OrganisationAdmin;
    this.giftAidService
      .isGiftAidEligble(currentOrganisationId)
      // if we could enable gift aid, means we are UK and a valid organisation
      .pipe(
        switchMap(canEnable =>
          canEnable === true
            ? // retrieve the organisation and check if the user actually disabled it
              this.organisationService.getById(currentOrganisationId).pipe(map(organisation => organisation.GiftAidEnabled === false))
            : of(false)
        )
      )
      .subscribe(enabled => (this.showGiftAidButton = enabled));
  }
}
