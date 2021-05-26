import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from 'src/app/account/services/account.service';
import { Router } from '@angular/router';
import * as pkg from './../../../../../package.json';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../../services/dashboard.service';
import { DirectDebitTypeHelper } from '../../helpers/direct-debit-type.helper';
import { DirectDebitType } from '../../enums/direct-debit.type';
import { TranslateService } from '@ngx-translate/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { OrganisationListModel } from 'src/app/organisations/models/organisation-list.model';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
    public currentCollectGroup: string;

    public privacyLink: string;
    public termsLink: string;
    
    get now() { return new Date(); }

    @Input()
    public showCloseButton = false;

    @Output()
    public closeButtonClicked = new EventEmitter();

    constructor(private accountService: AccountService,
        private dashboardService: DashboardService,
        private router: Router,
        private translateService: TranslateService,
        private backendService: BackendService) { }

    async ngOnInit(): Promise<void> {
        this.currentCollectGroup = this.dashboardService.currentCollectGroup?.Name;
        this.dashboardService.currentCollectGroupChange.subscribe(x => this.currentCollectGroup = x?.Name);
        this.dashboardService.currentOrganisationChange.subscribe(x => this.currentOrganisationChange(x));
        if (this.dashboardService.currentOrganisation != null)
            await this.currentOrganisationChange(this.dashboardService.currentOrganisation);
    }

    public closeMenu(): void {
        this.closeButtonClicked.emit();
    }

    logOut(): void {
        this.accountService.logOut();
        this.router.navigate(['/', 'account', 'login']);
    }

    async currentOrganisationChange(organisation: OrganisationListModel): Promise<void> {
        if (DirectDebitTypeHelper.fromOrganisationDetailModel(organisation) == DirectDebitType.BACS)
            this.privacyLink = await this.translateService.get("preboardingWelcomeDetailsComponent.privacyLinkGB").toPromise();
        else
            this.privacyLink = await this.translateService.get("preboardingWelcomeDetailsComponent.privacyLink").toPromise();
        this.termsLink = `${this.backendService.baseUrl}v2/organisations/${organisation.Id}/terms`;
    }
}
