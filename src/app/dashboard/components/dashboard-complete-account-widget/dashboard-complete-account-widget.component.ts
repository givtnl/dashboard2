import { Component, OnInit } from '@angular/core';
import { CompleteAccountWidgetService } from './services/complete-account-widget.service';
import { CompleteAccountWidgetModel } from './models/complete-account-widget.model';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Component({
  selector: 'app-dashboard-complete-account-widget',
  templateUrl: './dashboard-complete-account-widget.component.html',
  styleUrls: ['./dashboard-complete-account-widget.component.scss']
})
export class DashboardCompleteAccountWidgetComponent implements OnInit {
  public loading = false;
  public records = new Array<CompleteAccountWidgetModel>();
  constructor(private service: CompleteAccountWidgetService, private applicationStateService: ApplicationStateService) {}

  ngOnInit(): void {
    this.loading = true;
    this.service
      .get(this.applicationStateService.currentUserModel.organisationId)
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


  public percentageDegrees(toCalculatePercentage: number):number{
    return toCalculatePercentage / 100 * 360;
  }

  public getRouterLinks(record: CompleteAccountWidgetModel): Array<string> {
    switch (record.OrganisationRegistrationStatus) {
      // bank accounts
      case 3:
        return ['/', 'onboarding', 'bank-account'];
    }
  }
}
