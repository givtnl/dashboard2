import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { CollectGroupListModel } from "src/app/collect-groups/models/collect-group-list.model";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { OrganisationUserInviteStateService } from "../guards/organisation-user-invite-state.service";

@Component({
  selector: "app-dashboard-user-registration-details",
  templateUrl: "./dashboard-user-registration-details.component.html",
  styleUrls: ["./dashboard-user-registration-details.component.scss"]
})
export class DashboardUserRegistrationDetailsComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean;
  public collectGroups: CollectGroupListModel[] = this.route.snapshot.data.collectGroups;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applicationState: ApplicationStateService,
    private stateService: OrganisationUserInviteStateService,
    private translationService: TranslateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.form = this.formBuilder.group({
      organisationId:[this.stateService.currentOrganisationUserInvite?.organisationId || this.route.snapshot.queryParams.organisationId, [Validators.required]],
      collectGroupId:[this.stateService.currentOrganisationUserInvite?.collectGroupId || this.collectGroups[0].Id,[Validators.required]],
      firstName: [this.stateService.currentOrganisationUserInvite?.firstName, [Validators.required, Validators.minLength(1)]],
      lastName: [this.stateService.currentOrganisationUserInvite?.lastName, [Validators.required, Validators.minLength(3)]],
      email: [this.stateService.currentOrganisationUserInvite?.email , [Validators.required, Validators.email]],
      language:[this.applicationState.currentUserExtensionModel.AppLanguage || this.translationService.getBrowserLang()],
      country:[this.applicationState.currentUserExtensionModel.Country || 'GB']
    });
  }

  submit() {
    if (this.form.invalid) {
      this.translationService
        .get("errorMessages.validation-errors")
        .subscribe((msg) => this.toastr.warning(msg));
      return;
    }
    this.loading = true;
    this.stateService.currentOrganisationUserInvite = this.form.getRawValue();
    this.router
      .navigate(["/", "dashboard-user-registration", "done"], {queryParamsHandling:'merge'})
      .then((x) => (this.loading = false));
  }
}
