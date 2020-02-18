import { Component, OnInit } from '@angular/core';
import { CompleteAccountWidgetService } from './services/complete-account-widget.service';
import { CompleteAccountWidgetModel } from './models/complete-account-widget.model';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-complete-account-widget',
  templateUrl: './dashboard-complete-account-widget.component.html',
  styleUrls: ['./dashboard-complete-account-widget.component.scss']
})
export class DashboardCompleteAccountWidgetComponent implements OnInit {
  public loading = false;
  public records = new Array<CompleteAccountWidgetModel>();
  constructor(
    private service: CompleteAccountWidgetService,
    private router: Router,
    private applicationStateService: ApplicationStateService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.service
      .get(this.applicationStateService.currentTokenModel.OrganisationAdmin)
      .subscribe(x => (this.records = x))
      .add(() => (this.loading = false));
  }

  public percentageComplete(): number {
    if (this.records && this.records.length > 0) {
      const totalNumberOfRecords = this.records.length;
      return (100 / totalNumberOfRecords) * this.records.filter(x => x.Finished).length;
    }
    return 0;
  }

  public percentageDegrees(toCalculatePercentage: number): number {
    return (toCalculatePercentage / 100) * 360;
  }

  public navigate(record: CompleteAccountWidgetModel): void {
    const toNavigateRouterLinks = this.getRouterLinks(record);
    if (toNavigateRouterLinks && toNavigateRouterLinks.length > 0) {
      this.loading = true;
      this.router.navigate(toNavigateRouterLinks).catch(error => console.log(error)).finally(() => (this.loading = false));
    }
  }

  public getRouterLinks(record: CompleteAccountWidgetModel): Array<any> {
    switch (record.OrganisationRegistrationStatus) {
      case 1:
        return ['/', 'onboarding', 'organisation-details'];
      case 3:
        return ['/', 'onboarding', 'bank-account'];
      case 4:
        return record.InProgress
          ? ['/', 'onboarding', 'bank-account', { outlets: { 'onboarding-outlet': ['already-invited'] } }]
          : ['/', 'onboarding', 'bank-account-holder'];
      case 6: 
        return !record.InProgress ? ['/', 'onboarding', 'giftaid'] : ['/', 'dashboard']

      default:
        break;
    }
  }
}
