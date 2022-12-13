import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-collect-group-dashboard-home",
  templateUrl: "./collect-group-dashboard-home.component.html",
  styleUrls: ["./collect-group-dashboard-home.component.scss"],
})
export class CollectGroupDashboardHomeComponent implements OnInit {
  public collectGroupName: string;
  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private applicationStateService: ApplicationStateService
  ) {}

  ngOnInit(): void {
    this.collectGroupName = this.dashboardService.currentCollectGroup?.Name;
    this.dashboardService.currentCollectGroupChange.subscribe(
      (x) => (this.collectGroupName = x?.Name)
    );
    this.route.queryParams.subscribe((params) => {
      if (
        params["redirect"] !== null &&
        params["redirect"] !== undefined &&
        params["redirect"] == "true"
      ) {
        let currentToken = this.applicationStateService.currentTokenModel;
        window.location.href = `${environment.oldDashboardUrl}/#/login?access_token=${currentToken.access_token}&refresh_token=${currentToken.refresh_token}`;
      }
    });
  }

  peopleClicked(caller: CollectGroupDashboardHomeComponent): void {
    caller.loading = true;
  }
}
