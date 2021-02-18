import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-dashboard-link-button',
    templateUrl: './dashboard-link-button.component.html',
    styleUrls: ['./dashboard-link-button.component.scss']
})
export class DashboardLinkButtonComponent {
    @Input()
    public text: string;

    @Input()
    public icon: string;

    @Input()
    public disabled = false;

    @Input()
    public route: Array<string>;

    @Input()
    public params: {};

    @Input()
    public click: Event
}
