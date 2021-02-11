import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from 'src/app/account/services/account.service';
import { Router } from '@angular/router';
import * as pkg from './../../../../../package.json';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
    versionNumber = "";
    
    public currentCollectGroup: string;
    
    @Input()
    public showCloseButton = false;

    @Output()
    public closeButtonClicked = new EventEmitter();

    constructor(private accountService: AccountService, private dashboardService: DashboardService, private router: Router) {
        if (!environment.production) this.versionNumber = pkg['version'];
        dashboardService.currentCollectGroupChange.subscribe(x => this.currentCollectGroup = x.Name);
    }

    public closeMenu(): void {
        this.closeButtonClicked.emit();
    }

    logOut(): void {
        this.accountService.logOut();
        this.router.navigate(['/', 'account', 'login']);
    }
}
