import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardUserRegistrationDetailsComponent } from "./dashboard-user-registration-details/dashboard-user-registration-details.component";
import { DashboardUserRegistrationDoneComponent } from "./dashboard-user-registration-done/dashboard-user-registration-done.component";
import { DashboardUserRegistrationIntroComponent } from "./dashboard-user-registration-intro/dashboard-user-registration-intro.component";
import { CreateDashboardUserGuard } from "./guards/create-dashboard-user.guard";

const routes: Routes = [
    {
        path: '',
        component: DashboardUserRegistrationIntroComponent
    },
    {
        path: 'details',
        component: DashboardUserRegistrationDetailsComponent
    },
    {
        path: 'done',
        component: DashboardUserRegistrationDoneComponent,
        canActivate: [CreateDashboardUserGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}) export class DashboardUserRegistrationRoutingModule { }