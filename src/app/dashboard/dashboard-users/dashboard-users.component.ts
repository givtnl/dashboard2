import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrganisationUserInviteListModel } from "src/app/dashboard-user-registration/models/organisation-user-invite-list.model";
import { OrganisationUserInviteService } from "src/app/dashboard-user-registration/services/organisation-user-invite.service";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { DashboardUserDetailModel } from "src/app/users/models/dashboard-user-detail.model";
import { DashboardUsersService } from "src/app/users/services/dashboard-users.service";
import { DashboardUserViewModel } from "./viewmodels/dashboard-user.viewmodel";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-dashboard-users",
    templateUrl: "./dashboard-users.component.html",
    styleUrls: ["./dashboard-users.component.scss", "../dashboard.module.scss"]
})
export class DashboardUsersComponent implements OnInit {

    @ViewChild('userModal') userModal;

    pageTitle: string;

    public loading = false;

    public dashboardUsers: DashboardUserViewModel[] = [];

    public modalItemIndex: number = 0;
    public modalItem: DashboardUserViewModel = { Id: "", FirstName: "", LastName: "", Email: ""};

    constructor(
        private stateService: ApplicationStateService,
        private route: ActivatedRoute,
        private inviteService: OrganisationUserInviteService,
        private dashboardUsersService: DashboardUsersService,
        private dashboardService: DashboardService
    ) { }

    canDeleteUser(userId: string): boolean {
        return this.stateService.currentUserModel.GUID !== userId;
    }
    
    ngOnInit(): void {
        this.loading = true;
        const users$ = this.dashboardUsersService.getUsers(this.stateService.currentTokenModel.OrganisationAdmin);
        const invites$ = this.inviteService.getAll(this.stateService.currentTokenModel.OrganisationAdmin);
        combineLatest([users$, invites$])
            .subscribe(result => {
                this.dashboardUsers = result[0].map(x => {
                    let model: DashboardUserViewModel = {
                        Email: x.EmailAddress,
                        FirstName: x.FirstName,
                        Id: x.Id,
                        LastName: x.LastName
                    }; return model;
                }).concat(
                    result[1].map(x => {
                        let model: DashboardUserViewModel = {
                            Email: x.Email,
                            FirstName: x.FirstName,
                            Id: x.Id,
                            LastName: x.LastName,
                            CreationDate: x.CreationDate
                        }; return model;
                    })
                ).sort((el1, el2) => {
                    if (!this.canDeleteUser(el1.Id))
                        return -1;
                    else if (!this.canDeleteUser(el2.Id))
                        return 1;
                    else
                        return el1.FirstName.localeCompare(el2.FirstName);
                });
                this.loading = false;
            });
    }
        
    async submit(): Promise<void> { }

    deleteUser(index: number): void {
        this.loading = true;
        if (this.dashboardUsers[index].CreationDate !== null && this.dashboardUsers[index].CreationDate !== undefined) {
            this.inviteService
            .delete(this.dashboardService.currentOrganisation.Id, this.dashboardUsers[index].Id)
            .subscribe((x) => this.dashboardUsers.splice(index, 1))
            .add(() => (this.loading = false));
        } else {
            this.dashboardUsersService
            .delete(this.dashboardService.currentOrganisation.Id, this.dashboardUsers[index].Id)
            .subscribe((x) => this.dashboardUsers.splice(index, 1))
            .add(() => (this.loading = false));
        }

        this.modalItem = { Id: "", FirstName: "", LastName: "", Email: "" };
        this.modalItemIndex = 0;
    }

    setModalItem(index: number): void {
        this.modalItem = this.dashboardUsers[index];
        this.modalItemIndex = index;
    }
}
