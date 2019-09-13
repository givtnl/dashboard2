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
      .get('5C70CBC0-8BD1-4BB0-A538-7C81B68C5FC3')
      .subscribe(x => (this.records = x))
      .add(() => (this.loading = false));
  }

  public percentageComplete(): number {
    //todo calc from api / model
    return 70;
  }

  public percentageDegrees(toCalculatePercentage: number): number {
    return (toCalculatePercentage / 100) * 360;
  }
}
