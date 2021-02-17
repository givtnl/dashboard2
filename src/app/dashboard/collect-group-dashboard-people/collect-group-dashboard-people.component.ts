import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Component({
    selector: 'app-collect-group-dashboard-people',
    templateUrl: './collect-group-dashboard-people.component.html',
    styleUrls: ['./collect-group-dashboard-people.component.scss']
})
export class CollectGroupDashboardPeopleComponent implements OnInit {
    public form: FormGroup;
    public pageTitle: string;

    constructor(private dashboardService: DashboardService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.pageTitle = `${this.dashboardService.currentCollectGroup.Name} > Who's who`;
        this.form = this.formBuilder.group({
            contactPersons: this.formBuilder.array(this.route.snapshot.data.contacts)
        });
    }

    get contactPersons() {
        return this.form.get("contactPersons") as FormArray;
    }

    submit(): void {

    }
}