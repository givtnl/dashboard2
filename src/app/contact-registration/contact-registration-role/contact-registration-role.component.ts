import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
    selector: 'app-contact-registration-role',
    templateUrl: './contact-registration-role.component.html',
    styleUrls: ['./contact-registration-role.component.scss']
})
export class ContactRegistrationRoleComponent implements OnInit {
    public form: FormGroup;
    public showChoose = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            roleType: "",
            chosenRoleInput: ""
        });
    }

    submit() { }

    roleOptionChange(value: number) {
        this.showChoose = value == 0;
    }
}