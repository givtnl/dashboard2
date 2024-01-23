import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ContactRegistrationStateService } from "../services/contact-registration-state.service";
import { CreateCollectGroupContactCommand } from "src/app/collect-group-contacts/commands/create-collect-group-contact.command";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { onConditionValidator } from "src/app/shared/validators/on-condition.validator";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";


@Component({
    selector: 'app-contact-registration-role',
    templateUrl: './contact-registration-role.component.html',
    styleUrls: ['./contact-registration-role.component.scss', '../contact-registration.module.scss']
})
export class ContactRegistrationRoleComponent implements OnInit, OnDestroy {
    public roles = [
        { key: 1, value: "contactRegistrationRoleComponent.firstOption" },
        { key: 2, value: "contactRegistrationRoleComponent.secondOption" },
        { key: 3, value: "contactRegistrationRoleComponent.thirdOption" }
    ]

    private roleExplanations = [
        { key: 1, value: "contactRegistrationRoleComponent.firstOptionExplanation" },
        { key: 2, value: "contactRegistrationRoleComponent.secondOptionExplanation" },
        { key: 3, value: "contactRegistrationRoleComponent.thirdOptionExplanation" }
    ]

    public form: UntypedFormGroup;
    public showChoose = false;
    public optionExplanation: string;
    private ngUnsubscribe = new Subject<void>();
    private command: CreateCollectGroupContactCommand

    constructor(private formBuilder: UntypedFormBuilder,
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
            chosenRoleInput: [null, [onConditionValidator(this.showChoose)]],

        });
    }

    async submit() { 
        if (this.form.invalid) {
            this.handleInvalidForm();
            return;
        }

        this.command.Role = this.form.value.chosenRoleInput?.length > 0
            ? this.form.value.chosenRoleInput
            : await this.translationService.get(this.roles.find(x => x.key == this.form.value.roleType).value).toPromise();
        this.stateService.currentContactRegistrationInformation = this.command;
        this.router.navigate(['/', 'contact-registration', 'details']);
    }

    roleOptionChange(value: number) {
        this.showChoose = value == 0;
        this.resetForm(value);
        if (value > 0) {
            this.optionExplanation = this.roleExplanations.find(x => x.key == value).value;
        } else {
            this.optionExplanation = "";
        }
    }

    handleInvalidForm() {
        this.translationService.get("errorMessages.validation-errors").pipe(
            takeUntil(this.ngUnsubscribe)
        ).subscribe(msg => this.toastr.warning(msg));
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}