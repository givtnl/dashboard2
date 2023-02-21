import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-collect-group-dashboard-home',
    templateUrl: './collect-group-dashboard-home.component.html',
    styleUrls: ['./collect-group-dashboard-home.component.scss']
})
export class CollectGroupDashboardHomeComponent implements OnInit,OnDestroy {

    public collectGroupName: string;
    public loading = false;
    private ngUnsubscribe = new Subject<void>();
    constructor(private route: ActivatedRoute,
        private dashboardService: DashboardService,
        private applicationStateService: ApplicationStateService) { }

    ngOnInit(): void {
        var redirectUrl = this.dashboardService.getOldDashboardUrl();
        this.collectGroupName = this.dashboardService.currentCollectGroup?.Name;
        this.dashboardService.currentCollectGroupChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => this.collectGroupName = x?.Name);
        this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
            if (params['redirect'] !== null && params['redirect'] !== undefined && params['redirect'] == 'true') {
                let currentToken = this.applicationStateService.currentTokenModel;
                window.location.href = `${redirectUrl}/#/login?access_token=${currentToken.access_token}&refresh_token=${currentToken.refresh_token}`;
            }
        });
    }

    peopleClicked(caller: CollectGroupDashboardHomeComponent): void {
        caller.loading = true;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
