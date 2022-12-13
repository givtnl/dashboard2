import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreateCollectGroupUserCommand } from 'src/app/collect-groups/models/create-collect-group-user.command';

@Component({
    selector: 'app-preboarding-organisation-admin-details',
    templateUrl: './preboarding-organisation-admin-details.component.html',
    styleUrls: ['./preboarding-organisation-admin-details.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingOrganisationAdminDetailsComponent implements OnInit {
    private orgAdmins: CreateCollectGroupUserCommand[];
    public emails = ["Ah yeep", "Goedja?"]
    public loading = false;

    form: UntypedFormGroup
    constructor(
        private formBuilder: UntypedFormBuilder,
        private translationService: TranslateService,
        private toastr: ToastrService,
        private preboardingStateService: PreboardingStateService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.orgAdmins = this.route.snapshot.data.orgAdmins;

        this.form = this.formBuilder.group({
            inviteEmails: this.mapEmailsToArray(this.orgAdmins && this.orgAdmins.length > 0 ? this.orgAdmins : [])
        })
        if (this.orgAdmins.length == 0) {
            this.inviteEmails().push(this.mapEmail())
        }
    }
    mapEmail(email: string = null): UntypedFormGroup {
        return this.formBuilder.group({
            email: [email ? email : null, [Validators.required, Validators.email]]
        })
    }
    mapEmailsToArray(emails: CreateCollectGroupUserCommand[]): UntypedFormArray {
        return this.formBuilder.array(emails.map(x => this.mapEmail(x.email)))
    }
    inviteEmails(): UntypedFormArray {
        return this.form.get("inviteEmails") as UntypedFormArray
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
        this.preboardingStateService.currentOrganisationAdminContact = this.form.value.inviteEmails.map(x => {
            return { email: x.email.trim().replace("\n","").replace("\r",""), language: this.preboardingStateService.organisationDetails.language }
        })

    }

    handleInvalidForm() {
        let errorMessages = new Array<Observable<string>>();
        let resolvedErrorMessages = new Array<string>();

        const organisatorEmailErrors = this.form.get('organisatorEmail').errors;

        if (organisatorEmailErrors) {
            if (organisatorEmailErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.organisator-email-required'));
            }
            if (organisatorEmailErrors.email) {
                errorMessages.push(this.translationService.get('errorMessages.email-not-an-email'));
            }
        }

        forkJoin(errorMessages)
            .pipe(tap(results => (resolvedErrorMessages = results)))
            .pipe(switchMap(results => this.translationService.get('errorMessages.validation-errors')))
            .subscribe(title =>
                this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
                    enableHtml: true
                })
            );
    }
}
