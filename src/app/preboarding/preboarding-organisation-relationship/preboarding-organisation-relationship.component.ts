import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OrganisationWithRulesDetail } from 'src/app/onboarding/organisation-details/models/organisation-with-rules-detail.model';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-preboarding-organisation-relationship',
    templateUrl: './preboarding-organisation-relationship.component.html',
    styleUrls: ['./preboarding-organisation-relationship.component.scss']
})

export class PreboardingOrganisationRelationComponent implements OnInit,OnDestroy {

    public form: FormGroup;
    public providingOrganisations: OrganisationWithRulesDetail[] = [];
    private ngUnsubscribe = new Subject<void>();
    constructor(private activatedRoute: ActivatedRoute,private  formBuilder: FormBuilder, private preBoardingStateService: PreboardingStateService, private router: Router) {

    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            providingOrganisation: [
                null,
                Validators.required
            ],
            rules: this.formBuilder.array([])
        });
        this.providingOrganisations = this.activatedRoute.snapshot.data.providingOrganisations;
        this.form.get('providingOrganisation').valueChanges
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(newValue => this.preFillRules(newValue));
    }

    submit() {
        if (this.form.value.providingOrganisation) {
            this.preBoardingStateService.organisationRelationship = this.form.value.providingOrganisation;
            this.preBoardingStateService.currentCreateOrganisationshipRuleCommand = {
                usingOrganisationId: this.preBoardingStateService.organisationDetails.organisationId,
                providingOrganisationId: this.form.value.providingOrganisation.Id,
                rules: this.rules().getRawValue().filter(x => x.selected).map(x => x.ruleType)
            };
        }else {
            this.preBoardingStateService.organisationRelationship = null;
            this.preBoardingStateService.currentCreateOrganisationshipRuleCommand = null;
        }
     
        this.router.navigate(["/preboarding/register/mail-box-address-details"]);
    }

    rules(): FormArray {
        return this.form.get('rules') as FormArray;
    }

    preFillRules(organisation: OrganisationWithRulesDetail): void {
        this.rules().clear();
        organisation.RelationshipRules.forEach(rule => {
            this.rules().push(this.formBuilder.group({
                ruleType: rule.Rule,
                optional: rule.Optional,
                selected: [{
                    value: true,
                    disabled: !rule.Optional
                }]
            }))
        })
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}