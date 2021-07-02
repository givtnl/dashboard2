import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-custom-card-v2',
    templateUrl: './custom-card-v2.component.html',
    styleUrls: ['./custom-card-v2.component.scss']
})
export class CustomCardV2Component {
    @Input() public titleTranslationKey: string;
    @Input() public description: string;
    @Input() public questionMarkTitle: string;
    @Input() public questionMarkText: string;
    @Input() public questionMarkPictureTitle: string;
    @Input() public questionMarkPictureText: string;
    @Input() public questionMarkPicturePath: string;
    @Input() public questionMarkPictureAlt: string;
    @Input() public showCloseButton = false;
    // @Input() public icon: string;
    // @Input() public iconBackgroundClass: string;
    @Input() public showPreviousButton = false;
    @Input() public showSideInfo = false;
    @Input() public loading = false;
    /**
     *
     */
    constructor(private location: Location, private dashboardService: DashboardService, private router: Router) {

    }

    public onClickPrevious(): void {
        this.location.back();
    }

    public onClickClose(): void {
        this.router.navigate(['/', 'dashboard', 'root'], { queryParams: { organisationId: this.dashboardService.currentOrganisation.Id }, queryParamsHandling: 'merge' });
    }    
}