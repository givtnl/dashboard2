import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardUserRegistrationIntroComponent } from "./dashboard-user-registration-intro/dashboard-user-registration-intro.component";
import { DashboardUserRegistrationDetailsComponent } from "./dashboard-user-registration-details/dashboard-user-registration-details.component";
import { DashboardUserRegistrationDoneComponent } from "./dashboard-user-registration-done/dashboard-user-registration-done.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { DashboardUserRegistrationRoutingModule } from "./dashboard-user-registration-routing.module";

@NgModule({
  declarations: [
    DashboardUserRegistrationIntroComponent,
    DashboardUserRegistrationDetailsComponent,
    DashboardUserRegistrationDoneComponent
  ],
  imports: [
    DashboardUserRegistrationRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardUserRegistrationModule {}
