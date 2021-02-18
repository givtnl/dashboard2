import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ContactRegistrationDetailsComponent } from "./contact-registration-details/contact-registration-details.component";
import { ContactRegistrationDoneComponent } from "./contact-registration-done/contact-registration-done.component";
import { ContactRegistrationIntroComponent } from "./contact-registration-intro/contact-registration-intro.component";
import { ContactRegistrationRoleComponent } from "./contact-registration-role/contact-registration-role.component";
import { ContactRegistrationRoutingModule } from "./contact-registration-routing.module";
import { CreateCollectGroupContactGuard } from "./guards/create-collect-group-contact.guard";

@NgModule({
    declarations: [
        ContactRegistrationRoleComponent,
        ContactRegistrationIntroComponent,
        ContactRegistrationDetailsComponent,
        ContactRegistrationDoneComponent
    ],
    imports: [
        ContactRegistrationRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class ContactRegistrationModule { }