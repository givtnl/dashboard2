import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Component({
    selector: 'app-collect-group-dashboard-people',
    templateUrl: './collect-group-dashboard-people.component.html',
    styleUrls: ['./collect-group-dashboard-people.component.scss']
})
export class CollectGroupDashboardPeopleComponent implements OnInit {
    public form: FormGroup;
    public pageTitle: string;

    constructor(private dashboardService: DashboardService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private translate: TranslateService) { }

    async ngOnInit(): Promise<void> {
        this.pageTitle = `${this.dashboardService.currentCollectGroup.Name} > ${await this.translate.get('collectGroupDashboardPeopleComponent.pageTitle').toPromise()}`;
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