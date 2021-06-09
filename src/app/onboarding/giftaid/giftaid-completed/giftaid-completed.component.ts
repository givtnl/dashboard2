import { Component, OnInit } from '@angular/core';
import mixpanel from 'mixpanel-browser';

@Component({
    selector: 'app-giftaid-completed',
    templateUrl: './giftaid-completed.component.html',
    styleUrls: ['./giftaid-completed.component.scss']
})
export class GiftaidCompletedComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        mixpanel.track("giftAid:end");
    }
}
