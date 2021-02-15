import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactRegistrationDetailsComponent } from "./contact-registration-details/contact-registration-details.component";
import { ContactRegistrationDoneComponent } from "./contact-registration-done/contact-registration-done.component";
import { ContactRegistrationIntroComponent } from "./contact-registration-intro/contact-registration-intro.component";
import { ContactRegistrationRoleComponent } from "./contact-registration-role/contact-registration-role.component";

const routes: Routes = [
    {
        path: '',
        component: ContactRegistrationIntroComponent
    },
    {
        path: 'role',
        component: ContactRegistrationRoleComponent
    },
    {
        path: 'details',
        component: ContactRegistrationDetailsComponent
    },
    {
        path: 'done',
        component: ContactRegistrationDoneComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}) export class ContactRegistrationRoutingModule { }