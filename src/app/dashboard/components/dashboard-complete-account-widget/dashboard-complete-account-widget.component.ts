import { Component, OnInit } from '@angular/core';
import { CompleteAccountWidgetService } from './services/complete-account-widget.service';
import { CompleteAccountWidgetModel } from './models/complete-account-widget.model';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Router } from '@angular/router';
import { OrganisationRegistrationStatus } from '../../../organisations/enums/organisationregistrationstatus.enum';

@Component({
    selector: 'app-dashboard-complete-account-widget',
    templateUrl: './dashboard-complete-account-widget.component.html',
    styleUrls: ['./dashboard-complete-account-widget.component.scss']
})
export class DashboardCompleteAccountWidgetComponent implements OnInit {
    public loading = false;
    public records = new Array<CompleteAccountWidgetModel>();
    constructor(
        private service: CompleteAccountWidgetService,
        private router: Router,
        private applicationStateService: ApplicationStateService
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.service
            .get(this.applicationStateService.currentTokenModel.OrganisationAdmin)
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

    public percentageDegrees(toCalculatePercentage: number): number {
        return (toCalculatePercentage / 100) * 360;
    }

    public async navigate(record: CompleteAccountWidgetModel): Promise<void> {
        const toNavigateRouterLinks = this.getRouterLinks(record);
        if (toNavigateRouterLinks && toNavigateRouterLinks.length > 0) {
            this.loading = true;
            await this.router.navigate(toNavigateRouterLinks)
                .catch(error => console.log(error))
                .finally(() => (this.loading = false));
        }
    }

    public getRouterLinks(record: CompleteAccountWidgetModel): Array<any> {
        switch (record.OrganisationRegistrationStatus) {
            case OrganisationRegistrationStatus.CompleteOrganisationDetails:
                return ['/', 'onboarding', 'organisation-details'];
            case OrganisationRegistrationStatus.AddBankAccount:
                return ['/', 'onboarding', 'bank-account']
            case OrganisationRegistrationStatus.UploadBankStatement:
                return !record.InProgress ? ['/', 'onboarding', 'bank-statement'] : ['/', 'dashboard'];
            case OrganisationRegistrationStatus.AddBankAccountHolders:
                return record.InProgress
                    ? ['/', 'onboarding', 'bank-account', { outlets: { 'onboarding-outlet': ['already-invited'] } }]
                    : ['/', 'onboarding', 'bank-account-holder'];
            case OrganisationRegistrationStatus.AddGiftAidSettings:
                return !record.InProgress ? ['/', 'onboarding', 'giftaid'] : ['/', 'dashboard']
            default:
                break;
        }
    }
}
