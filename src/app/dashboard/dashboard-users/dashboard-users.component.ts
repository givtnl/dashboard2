import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { OrganisationUserInviteListModel } from "src/app/dashboard-user-registration/models/organisation-user-invite-list.model";
import { OrganisationUserInviteService } from "src/app/dashboard-user-registration/services/organisation-user-invite.service";
import { DashboardUserDetailModel } from "src/app/users/models/dashboard-user-detail.model";

@Component({
  selector: "app-dashboard-users",
  templateUrl: "./dashboard-users.component.html",
  styleUrls: ["./dashboard-users.component.scss", "../dashboard.module.scss"]
})
export class DashboardUsersComponent implements OnInit {
  pageTitle: string;

  public loading = false;
  public users: DashboardUserDetailModel[] = [];
  public invites: OrganisationUserInviteListModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: OrganisationUserInviteService
  ) {}

  ngOnInit(): void {
    this.users = this.route.snapshot.data.users as DashboardUserDetailModel[];
    this.invites = this.route.snapshot.data
      .invites as OrganisationUserInviteListModel[];
  }
  deleteInvite(id: string, index: number): void {
    this.loading = true;
    this.service.delete(this.route.snapshot.queryParams.organisationId, id)
    .subscribe(x => this.invites.splice(index,1))
    .add(() => this.loading = false);
  }
  async submit(): Promise<void> {}

  async deleteUser(): Promise<void> {}
}
