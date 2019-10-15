import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard-tile-widget',
  templateUrl: './dashboard-tile-widget.component.html',
  styleUrls: ['./dashboard-tile-widget.component.scss']
})
export class DashboardTileWidgetComponent {
  @Output()
  public tileClicked = new EventEmitter<Event>();

  @Input()
  public title: string;

  @Input()
  public footer: string;

  @Input()
  public image: string;

  @Input()
  public icon: string;

  tileClick(event: Event) {
    this.tileClicked.emit(event);
  }
}
