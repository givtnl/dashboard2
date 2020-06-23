import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OrganisationWithRulesDetail } from 'src/app/onboarding/organisation-details/models/organisation-with-rules-detail.model';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-preboarding-organisation-relationship',
    templateUrl: './preboarding-organisation-relationship.component.html',
    styleUrls: ['./preboarding-organisation-relationship.component.scss']
})

export class PreboardingOrganisationRelationComponent implements OnInit {
    

    public loading = false;
    public form: FormGroup;

    public providingOrganisations: OrganisationWithRulesDetail[] = [];

    constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private preBoardingStateService: PreboardingStateService, private router: Router, private translationService: TranslateService ) {
        
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            providingOrganisationId: [
                null,
                Validators.required
            ]
        });

        this.providingOrganisations = this.activatedRoute.snapshot.data.providingOrganisations;
        this.providingOrganisations.unshift({
            Id: null,
            Name: "niet van toepassing",
            RelationshipRules: []
        })
    }

    submit() {
        let currentOrganisationRelationship = this.form.get('providingOrganisationId') as FormArray;
        this.preBoardingStateService.organisationRelationship = this.providingOrganisations.find(org => org.Id == currentOrganisationRelationship.value);
        this.router.navigate(["/preboarding/register/mail-box-address-details"])
    }
}