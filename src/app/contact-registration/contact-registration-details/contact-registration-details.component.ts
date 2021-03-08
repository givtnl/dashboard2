import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { CreateCollectGroupContactCommand } from "src/app/collect-group-contacts/commands/create-collect-group-contact.command";
import { ContactRegistrationStateService } from "../services/contact-registration-state.service";


@Component({
    selector: 'app-contact-registration-details',
    templateUrl: './contact-registration-details.component.html',
    styleUrls: ['./contact-registration-details.component.scss', '../contact-registration.module.scss']
})
export class ContactRegistrationDetailsComponent implements OnInit {
    public form: FormGroup;
    public loading: boolean;
    private command: CreateCollectGroupContactCommand

    constructor(private formBuilder: FormBuilder,
        private stateService: ContactRegistrationStateService,
        private router: Router,
        private translationService: TranslateService,
        private toastr: ToastrService) { }

    ngOnInit(): void {
        this.loading = false;
        this.command = this.stateService.currentContactRegistrationInformation
        this.form = this.formBuilder.group({
            firstName: [null, [Validators.required, Validators.minLength(1)]],
            lastName: [null, [Validators.required, Validators.minLength(3)]],
            email: [null, [Validators.required, Validators.email]],
            telephone: null
        });
    }

    submit() {
        if (this.form.invalid) {
            this.translationService.get("errorMessages.validation-errors")
                .subscribe(msg => this.toastr.warning(msg));
            return;
        }
        this.loading = true;
        this.command.Email = this.form.value.email;
        this.command.FirstName = this.form.value.firstName;
        this.command.LastName = this.form.value.lastName;
        this.command.Telephone = this.form.value.telephone?.length > 0 ? this.form.value.telephone : null;
        this.stateService.currentContactRegistrationInformation = this.command;

        this.router.navigate(['/', 'contact-registration', 'done']);
    }
}