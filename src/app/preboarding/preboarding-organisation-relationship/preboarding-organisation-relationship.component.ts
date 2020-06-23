import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationWithRulesDetail } from 'src/app/onboarding/organisation-details/models/organisation-with-rules-detail.model';

@Component({
    selector: 'app-preboarding-organisation-relationship',
    templateUrl: './preboarding-organisation-relationship.component.html',
    styleUrls: ['./preboarding-organisation-relationship.component.scss']
})

export class PreboardingOrganisationRelationComponent implements OnInit {
    

    public loading = false;
    public form: FormGroup;

    public providingOrganisations: OrganisationWithRulesDetail[] = [];

    constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
        
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            providingOrganisationId: [
                null,
                [
                    Validators.required
                ]
            ]
        });

        this.providingOrganisations = this.activatedRoute.snapshot.data.providingOrganisations;
    }
}