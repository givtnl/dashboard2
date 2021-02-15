import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
    selector: 'app-contact-registration-details',
    templateUrl: './contact-registration-details.component.html',
    styleUrls: ['./contact-registration-details.component.scss']
})
export class ContactRegistrationDetailsComponent implements OnInit {
    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstName: "",
            lastName: "",
            email: ""
        });
    }

    submit() { }
}