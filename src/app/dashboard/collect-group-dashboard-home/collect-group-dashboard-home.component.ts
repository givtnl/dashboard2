import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-collect-group-dashboard-home',
    templateUrl: './collect-group-dashboard-home.component.html',
    styleUrls: ['./collect-group-dashboard-home.component.scss']
})
export class CollectGroupDashboardHomeComponent implements OnInit {

    public collectGroupName: string

    constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

    ngOnInit() {
        this.collectGroupName = this.dashboardService.currentCollectGroup.Name;
        this.dashboardService.currentCollectGroupChange.subscribe(x => this.collectGroupName = x.Name);
        this.route.queryParams.subscribe(params => {
            if (params['redirect'] !== null && params['redirect'] !== undefined && params['redirect'] == 'true') {
                window.location.href = environment.oldDashboardUrl;
            }
        });
    }
}
