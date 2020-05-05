import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreateCollectGroupCommand } from 'src/app/collect-groups/models/create-collect-group.command';

@Component({
  selector: 'app-preboarding-name-in-app',
  templateUrl: './preboarding-name-in-app.component.html',
  styleUrls: ['./preboarding-name-in-app.component.scss', '../../preboarding/preboarding.module.scss']
})

export class PreboardingNameInAppComponent implements OnInit {

  public form: FormGroup
  private collectGroup: CreateCollectGroupCommand;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translationService: TranslateService,
    private toastr: ToastrService,
    private preboardingStateService: PreboardingStateService,
    private router: Router) { }

  ngOnInit() {
    this.collectGroup = this.route.snapshot.data.collectGroup;
    this.form = this.formBuilder.group({
      inAppOrgName: [this.collectGroup ? this.collectGroup.name : null, [Validators.required, Validators.maxLength(30)]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.continue();
    this.router.navigate(["/preboarding/register/mail-box-address-details"])
  }

  continue() {
    this.collectGroup.name = this.form.value.inAppOrgName.trim();
    this.preboardingStateService.currentCollectGroupDetails = this.collectGroup;
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const charityNumberErrors = this.form.get('inAppOrgName').errors;

    if (charityNumberErrors) {
      if (charityNumberErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.name-in-app-required'));
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
