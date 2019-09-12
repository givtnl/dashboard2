import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-tile-widget',
  templateUrl: './dashboard-tile-widget.component.html',
  styleUrls: ['./dashboard-tile-widget.component.scss']
})
export class DashboardTileWidgetComponent {
  @Input()
  public title: string;

  @Input()
  public footer: string;

  @Input()
  public image: string;

  @Input()
  public icon: string;
}
