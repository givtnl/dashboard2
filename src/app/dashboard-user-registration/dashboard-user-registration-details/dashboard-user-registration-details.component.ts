import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CollectGroupListModel } from "src/app/collect-groups/models/collect-group-list.model";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { OrganisationUserInviteStateService } from "../guards/organisation-user-invite-state.service";

@Component({
  selector: "app-dashboard-user-registration-details",
  templateUrl: "./dashboard-user-registration-details.component.html",
  styleUrls: ["./dashboard-user-registration-details.component.scss"]
})
export class DashboardUserRegistrationDetailsComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  public loading: boolean;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applicationState: ApplicationStateService,
    private stateService: OrganisationUserInviteStateService,
    private dashboardService: DashboardService,
    private translationService: TranslateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.form = this.formBuilder.group({
      organisationId:[this.stateService.currentOrganisationUserInvite?.organisationId || this.dashboardService.currentOrganisation.Id, [Validators.required]],
      firstName: [this.stateService.currentOrganisationUserInvite?.firstName, [Validators.required, Validators.minLength(1)]],
      lastName: [this.stateService.currentOrganisationUserInvite?.lastName, [Validators.required, Validators.minLength(3)]],
      email: [this.stateService.currentOrganisationUserInvite?.email , [Validators.required, Validators.email]],
      country:[this.applicationState.currentUserExtensionModel.Country || this.dashboardService.currentOrganisation.Country]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.translationService
        .get("errorMessages.validation-errors")
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((msg) => this.toastr.warning(msg));
      return;
    }
    this.loading = true;
    this.stateService.currentOrganisationUserInvite = this.form.getRawValue();
    this.router
      .navigate(["/", "dashboard-user-registration", "done"], {queryParamsHandling:'merge'})
      .then((x) => (this.loading = false));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}
}
