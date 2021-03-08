import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { CollectGroupContactsService } from "src/app/collect-group-contacts/services/collect-group-contacts.service";
import { SendUserRegistrationEmailForCollectGroupCommand } from "src/app/collect-groups/models/send-user-registration-email-for-collect-group.command";
import { ContactRegistrationStateService } from "src/app/contact-registration/services/contact-registration-state.service";
import { OnboardingNewUsersService } from "src/app/onboarding/new-users/services/onboarding-new-users.service";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Injectable({
    providedIn: 'root'
})
export class CreateCollectGroupContactGuard implements CanActivate {
    constructor(private dashboardService: DashboardService,
        private collectGroupContactsService: CollectGroupContactsService,
        private contactRegistrationStateService: ContactRegistrationStateService,
        private onboardingNewUsersService: OnboardingNewUsersService,
        private translateService: TranslateService,
        private router: Router) { }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            let contactInformation = this.contactRegistrationStateService.currentContactRegistrationInformation;
            await this.collectGroupContactsService
                .createContact(this.dashboardService.currentCollectGroup.GUID, contactInformation)
                .toPromise();
            
            if (contactInformation.Role == await this.translateService.get("contactRegistrationRoleComponent.secondOption").toPromise()) {
                // invite user to dashboard if the user has the financial role
                let command: SendUserRegistrationEmailForCollectGroupCommand = {
                    collectGroupId: this.dashboardService.currentCollectGroup.GUID,
                    email: contactInformation.Email,
                    language: ""
                };
                await this.onboardingNewUsersService.sendRegistrationMail(this.dashboardService.currentCollectGroup.GUID, command)
                    .toPromise();
            }
            return true;
        } catch (error) {
            return this.HandleFailure(next);
        }
    }

    private HandleFailure(next: ActivatedRouteSnapshot): boolean {
        this.router.navigate(['system','root', { outlets: { 'system-outlet': ['error'] }} ]);
        return false;
    }
}