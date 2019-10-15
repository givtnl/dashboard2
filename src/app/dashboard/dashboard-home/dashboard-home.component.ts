import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { CollectGroupDashboardListModel } from './models/collect-group-side-bar-list.model';
import { DashboardService } from './services/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  public loading = false;
  public collectGroups = new Array<CollectGroupDashboardListModel>();

  constructor(public applicationStateService: ApplicationStateService, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loading = true;
    this.dashboardService
      .getCollectGroups()
      .subscribe(x => (this.collectGroups = x))
      .add(() => (this.loading = false));
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
}
