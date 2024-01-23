import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, Subject } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreateCollectGroupCommand } from 'src/app/collect-groups/models/create-collect-group.command';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';
import { wholeNumberValidator } from "src/app/shared/validators/whole-number.validator";

@Component({
  selector: "app-preboarding-visitor-count",
  templateUrl: "./preboarding-visitor-count.component.html",
  styleUrls: [
    "./preboarding-visitor-count.component.scss",
    "../../preboarding/preboarding.scss",
  ],
})
export class PreboardingVisitorCountComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  public form: UntypedFormGroup;
  private collectGroup: CreateCollectGroupCommand;
  private country: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private translationService: TranslateService,
    private toastr: ToastrService,
    private preboardingStateService: PreboardingStateService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.preboardingStateService.organisationDetails)
      this.country = this.preboardingStateService.organisationDetails.country;
    else this.country = "NL";
    this.collectGroup = this.route.snapshot.data
      .collectGroup as CreateCollectGroupCommand;

    this.form = this.formBuilder.group({
      numberOfVisitors: [
        this.collectGroup ? this.collectGroup.visitorCount : null,
        [
          Validators.required,
          Validators.min(1),
          this.country === "US"
            ? wholeNumberValidator(1, 100000)
            : wholeNumberValidator(1, 50000),
        ],
      ],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.continue();
    this.router.navigate(["/preboarding/register/launch-date"]);
  }

  continue() {
    this.collectGroup.visitorCount = parseInt(this.form.value.numberOfVisitors);
    this.preboardingStateService.currentCollectGroupDetails = this.collectGroup;
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const numberOfVisitorsErrors = this.form.get("numberOfVisitors").errors;

    if (numberOfVisitorsErrors) {
      if (numberOfVisitorsErrors.required) {
        errorMessages.push(
          this.translationService.get(
            "errorMessages.number-of-visitors-required"
          )
        );
      }
      if (numberOfVisitorsErrors.wholeNumber) {
        let errorTranslationText =
          this.country === "US"
            ? "errorMessages.number-of-visitors-min_max-US"
            : "errorMessages.number-of-visitors-min_max";
        errorMessages.push(this.translationService.get(errorTranslationText));
      }
    }

    forkJoin(errorMessages)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((results) => (resolvedErrorMessages = results)),
        switchMap((_) =>
          this.translationService.get("errorMessages.validation-errors")
        )
      )
      .subscribe((title) =>
        this.toastr.warning(resolvedErrorMessages.join("<br>"), title, {
          enableHtml: true,
        })
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
