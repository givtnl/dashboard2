import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OrganisationListModel } from "src/app/organisations/models/organisation-list.model";

@Component({
    selector: 'app-dashboard-select-organisation',
    templateUrl: './select-organisation.component.html',
    styleUrls: ['./select-organisation.component.scss']
})
export class DashboardSelectOrganisationComponent implements OnInit {
    public form: UntypedFormGroup

    public organisations: OrganisationListModel[]

    constructor(private formBuilder: UntypedFormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.organisations = this.activatedRoute.snapshot.data.organisations;
        this.form = this.formBuilder.group({
            organisationSelector: this.organisations[0].Id
        });
    }

    async submit(): Promise<void> {
        const organisationId = this.form.get('organisationSelector').value;
        this.router.navigate(['/', 'dashboard', 'root', { outlets: { 'dashboard-outlet': ['home'] } }],
            { queryParams: { organisationId: organisationId }, queryParamsHandling: 'merge' });
    }
}