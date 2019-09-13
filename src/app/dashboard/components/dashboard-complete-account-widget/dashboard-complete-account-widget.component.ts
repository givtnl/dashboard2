import { Component, OnInit } from '@angular/core';
import { CompleteAccountWidgetService } from './services/complete-account-widget.service';
import { CompleteAccountWidgetModel } from './models/complete-account-widget.model';

@Component({
  selector: 'app-dashboard-complete-account-widget',
  templateUrl: './dashboard-complete-account-widget.component.html',
  styleUrls: ['./dashboard-complete-account-widget.component.scss']
})
export class DashboardCompleteAccountWidgetComponent implements OnInit {
  public loading = false;
  public records = new Array<CompleteAccountWidgetModel>();
  constructor(private service: CompleteAccountWidgetService) {}

  ngOnInit(): void {
    this.loading = true;
    this.service
      .get('c800dd5e-f3a3-48c9-9eab-986e68b1dcb2')
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
