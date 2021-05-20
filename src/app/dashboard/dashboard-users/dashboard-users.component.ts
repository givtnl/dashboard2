import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
    'selector': 'app-dashboard-users',
    'templateUrl': './dashboard-users.component.html',
    'styleUrls': ['./dashboard-users.component.scss', '../dashboard.module.scss']
})
export class DashboardUsersComponent implements OnInit {
    form: FormGroup;
    pageTitle: string;

    get users() {
        return this.form.get("users") as FormArray;
    }

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

    ngOnInit(): void {
        let users = this.route.snapshot.data.users
        this.form = this.formBuilder.group({
            users: this.formBuilder.array(this.route.snapshot.data.users)
        });
    }

    async submit(): Promise<void> {

    }

    async deleteUser(): Promise<void> {
        
    }
}