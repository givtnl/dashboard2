import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreateCollectGroupCommand } from 'src/app/collect-groups/models/create-collect-group.command';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';


@Component({
  selector: 'app-preboarding-visitor-count',
  templateUrl: './preboarding-visitor-count.component.html',
  styleUrls: ['./preboarding-visitor-count.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingVisitorCountComponent implements OnInit {

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
    this.collectGroup = this.route.snapshot.data.collectGroup as CreateCollectGroupCommand;

    this.form = this.formBuilder.group({
      numberOfVisitors: [this.collectGroup ? this.collectGroup.visitorCount : null, [Validators.required, notNullOrEmptyValidator()]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.continue();
    this.router.navigate(["/preboarding/register/collections"])
  }

  continue() {
    this.collectGroup.visitorCount = this.form.value.numberOfVisitors;
    this.preboardingStateService.currentCollectGroupDetails = this.collectGroup;
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const numberOfVisitorsErrors = this.form.get('numberOfVisitors').errors;

    if (numberOfVisitorsErrors) {
      if (numberOfVisitorsErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.number-of-visitors-required'));
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
