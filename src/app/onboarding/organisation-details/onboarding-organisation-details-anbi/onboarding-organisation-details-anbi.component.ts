import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { onConditionValidator } from "src/app/shared/validators/on-condition.validator";
import { OnboardingOrganisationDetailsStateService } from "../services/onboarding-organisation-details-state.service";

@Component({
    selector: 'app-onboarding-organisation-details-anbi',
    templateUrl: './onboarding-organisation-details-anbi.component.html',
    styleUrls: ['./onboarding-organisation-details-anbi.component.scss']
})
export class OnboardingOrganisationDetailsAnbiComponent implements OnInit, OnDestroy {
    public form: UntypedFormGroup;
    public loading: boolean;
    private ngUnsubscribe = new Subject<void>();
    constructor(private formBuilder: UntypedFormBuilder,
        private translationService: TranslateService,
        private toastr: ToastrService,
        private organisationDetailsStateService: OnboardingOrganisationDetailsStateService,
        private router: Router) { }

    ngOnInit(): void {
        this.loading = false;
        this.form = this.formBuilder.group({
            taxDeductable: true,
            rsinNumber: [null, Validators.required]
        });
    }

    taxDeductableChanged(checked: boolean): void {
        this.form = this.formBuilder.group({
            taxDeductable: checked,
            rsinNumber: [null, checked ? Validators.required : null]
        });
    }

    submit(): void {
        if (this.form.invalid) {
            this.translationService.get("onboardingOrganisationDetailsAnbiComponent.errorRSIN")
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(msg => this.toastr.warning(msg));
            return;
        }
        this.loading = true;
        var currentOrganisationDetails = this.organisationDetailsStateService.currentOrganisationRegistrationDetailsModel;
        currentOrganisationDetails.TaxDeductable = this.form.value.taxDeductable;
        currentOrganisationDetails.RSIN = this.form.value.taxDeductable ? this.form.value.rsinNumber : null;
        this.organisationDetailsStateService.currentOrganisationRegistrationDetailsModel = currentOrganisationDetails;
        this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['complete'] } }]);        
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}