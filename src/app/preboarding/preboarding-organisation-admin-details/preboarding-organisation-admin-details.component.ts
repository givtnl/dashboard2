import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, Subject } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreateCollectGroupUserCommand } from 'src/app/collect-groups/models/create-collect-group-user.command';

@Component({
    selector: 'app-preboarding-organisation-admin-details',
    templateUrl: './preboarding-organisation-admin-details.component.html',
    styleUrls: ['./preboarding-organisation-admin-details.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingOrganisationAdminDetailsComponent implements OnInit, OnDestroy {
    private orgAdmins: CreateCollectGroupUserCommand[];
    public emails = ["Ah yeep", "Goedja?"]
    public loading = false;
    private ngUnsubscribe = new Subject<void>();
    form: FormGroup
    constructor(
        private formBuilder: FormBuilder,
        private translationService: TranslateService,
        private toastr: ToastrService,
        private preboardingStateService: PreboardingStateService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
      // this.orgAdmins = this.route.snapshot.data.orgAdmins;

      this.form = this.formBuilder.group({
        email: [
          this.orgAdmins && this.orgAdmins.length > 0
            ? this.orgAdmins[0].email
            : null,
          [Validators.required, Validators.email],
        ],
      });
    }
    
    submit() {
        if (this.form.invalid) {
            this.handleInvalidForm();
            return;
        }
        this.loading = true;
        this.continue();
        this.router.navigate(["/preboarding/register/complete"]).finally(() => (this.loading = false))
    }

    continue() {
        this.preboardingStateService.currentOrganisationAdminContact = [
          {
            email: this.form.get("email").value,
            language: this.preboardingStateService.organisationDetails.language,
          },
        ]; 
    }

    handleInvalidForm() {
        let errorMessages = new Array<Observable<string>>();
        let resolvedErrorMessages = new Array<string>();

        const organisatorEmailErrors = this.form.get("email").errors;

        if (organisatorEmailErrors) {
            if (organisatorEmailErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.organisator-email-required'));
            }
            if (organisatorEmailErrors.email) {
                errorMessages.push(this.translationService.get('errorMessages.email-not-an-email'));
            }
        }

        forkJoin(errorMessages)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                tap(results => (resolvedErrorMessages = results)),
                switchMap(_ => this.translationService.get('errorMessages.validation-errors')))
            .subscribe(title =>
                this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
                    enableHtml: true
                })
            );
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
