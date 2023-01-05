import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Router } from '@angular/router';
import { OrganisationRegistrationStatus } from '../../../organisations/enums/organisationregistrationstatus.enum';
import { OrganisationRegistrationStep } from 'src/app/organisations/models/organisation-registration-step';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'app-dashboard-complete-account-widget',
    templateUrl: './dashboard-complete-account-widget.component.html',
    styleUrls: ['./dashboard-complete-account-widget.component.scss']
})
export class DashboardCompleteAccountWidgetComponent implements OnInit,OnDestroy {
    public loading = false;
    public records = new Array<OrganisationRegistrationStep>();
    private ngUnsubscribe = new Subject<void>();
    constructor(
        private organisationService: OrganisationsService,
        private router: Router,
        private applicationStateService: ApplicationStateService,
        private dashboardService: DashboardService
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.organisationService
            .getRegistrationStatus(this.applicationStateService.currentTokenModel.OrganisationAdmin)
            .pipe(takeUntil(this.ngUnsubscribe))
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

    public async navigate(record: OrganisationRegistrationStep): Promise<void> {
        const toNavigateRouterLinks = this.getRouterLinks(record);
        if (toNavigateRouterLinks && toNavigateRouterLinks.length > 0) {
            this.loading = true;
            await this.router.navigate(toNavigateRouterLinks)
                .catch(error => console.log(error))
                .finally(() => (this.loading = false));
        }
    }

    public getRouterLinks(record: OrganisationRegistrationStep): Array<any> {
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
            case OrganisationRegistrationStatus.WePayKYCDetails:
                console.log()
                return ['/', 'onboarding', 'organisation-details-us',{ outlets: {"onboarding-outlet": ["wepay-kyc"] }}];
            case OrganisationRegistrationStatus.WePayTermsAndConditions:
                return ['/', 'onboarding', 'organisation-details-us',{ outlets: {"onboarding-outlet": ["terms-and-conditions"] }}];
            case OrganisationRegistrationStatus.WePayPayoutMethod:
                return ['/', 'onboarding', 'organisation-details-us',{ outlets: {"onboarding-outlet": ["payout-details"] }}];
                    
            default:
                break;
        }
    }

    hasFirstStepBeenCompletedForUSOrganisation(record: OrganisationRegistrationStep):boolean{
        if(this.dashboardService.currentOrganisation.Country !== "US" ||
        record.DisplayOrder === 1){
            return true;
        }
        if(this.records.length > 0){
          let stepOne = this.records.find(item=>{
            return item.DisplayOrder === 1;
          });
          if(stepOne != undefined && stepOne.Finished){
            return true;
          } else{
            return false;
          }
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
