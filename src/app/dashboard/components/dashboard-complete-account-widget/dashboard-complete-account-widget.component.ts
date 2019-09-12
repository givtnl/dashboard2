import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-complete-account-widget',
  templateUrl: './dashboard-complete-account-widget.component.html',
  styleUrls: ['./dashboard-complete-account-widget.component.scss']
})
export class DashboardCompleteAccountWidgetComponent  {
  public percentageComplete(): number {
    //todo calc from api / model
    return 70;
  }


  public percentageDegrees(toCalculatePercentage: number):number{
    return toCalculatePercentage / 100 * 360;
  }
}
