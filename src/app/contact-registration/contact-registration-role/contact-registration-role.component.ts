import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ContactRegistrationStateService } from "../services/contact-registration-state.service";
import { CreateCollectGroupContactCommand } from "src/app/collect-group-contacts/commands/create-collect-group-contact.command";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { whenVisibleValidator } from "src/app/shared/validators/when-visible.validator";


@Component({
    selector: 'app-contact-registration-role',
    templateUrl: './contact-registration-role.component.html',
    styleUrls: ['./contact-registration-role.component.scss', '../contact-registration.module.scss']
})
export class ContactRegistrationRoleComponent implements OnInit {
    public roles = [
        { key: 1, value: "Treasurer" }
    ]

    public form: FormGroup;
    public showChoose = false;

    private command: CreateCollectGroupContactCommand

    constructor(private formBuilder: FormBuilder,
        private stateService: ContactRegistrationStateService,
        private router: Router,
        private toastr: ToastrService,
        private translationService: TranslateService) { }

    ngOnInit(): void {
        this.command = this.stateService.currentContactRegistrationInformation
        this.resetForm();
    }

    resetForm(roleType: number | null = null) {
        this.form = this.formBuilder.group({
            roleType: roleType,
            chosenRoleInput: [null, [whenVisibleValidator(this.showChoose)]]
        });
    }

    submit() { 
        if (this.form.invalid) {
            this.handleInvalidForm();
            return;
        }

        this.command.role = this.form.value.chosenRoleInput?.length > 0 ? this.form.value.chosenRoleInput : this.roles.find(x => x.key == this.form.value.roleType).value
        this.stateService.currentContactRegistrationInformation = this.command
        this.router.navigate(['/','contact-registration','details'])
    }

    roleOptionChange(value: number) {
        this.showChoose = value == 0;
        this.resetForm(value);
    }

    handleInvalidForm() {
        this.translationService.get("errorMessages.validation-errors")
            .subscribe(msg => this.toastr.warning(msg));
    }
}