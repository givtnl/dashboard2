import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin, Subject } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreateCollectGroupCommand } from 'src/app/collect-groups/models/create-collect-group.command';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';
import { UniqueCollectGroupNameValidator } from 'src/app/collect-groups/validators/unique-collect-group-name.validator';
import { CollectGroupsService } from 'src/app/collect-groups/services/collect-groups.service';

@Component({
  selector: "app-preboarding-name-in-app",
  templateUrl: "./preboarding-name-in-app.component.html",
  styleUrls: [
    "./preboarding-name-in-app.component.scss",
    "../../preboarding/preboarding.module.scss",
  ],
})
export class PreboardingNameInAppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  public form: UntypedFormGroup;
  public questionMarkPicturePath: string;

  private collectGroup: CreateCollectGroupCommand;

  constructor(
    private route: ActivatedRoute,
    private collectGroupService: CollectGroupsService,
    private formBuilder: UntypedFormBuilder,
    private translationService: TranslateService,
    private toastr: ToastrService,
    private preboardingStateService: PreboardingStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.collectGroup = this.route.snapshot.data.collectGroup;
    this.form = this.formBuilder.group({
      inAppOrgName: [
        this.collectGroup ? this.collectGroup.name : null,
        [
          Validators.required,
          Validators.maxLength(30),
          notNullOrEmptyValidator(),
        ],
        [UniqueCollectGroupNameValidator.create(this.collectGroupService)],
      ],
      paymentReference: [
        this.preboardingStateService.organisationDetails.country.toLowerCase() ===
        "nl"
          ? "Automatische betaling Givt"
          : "Automatic Payment Givt",
      ],
    });
    switch (this.translationService.currentLang) {
      case "nl":
        this.questionMarkPicturePath =
          "../../../../assets/images/organisation-name-example1-nl.png";
        break;
      default:
        this.questionMarkPicturePath =
          "../../../../assets/images/organisation-name-example1-en.png";
    }
    // Set up a word count underneath the input text field
    document.getElementById("count_message").innerText = `0/30`;
    this.form
      .get("inAppOrgName")
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((text) => {
        document.getElementById(
          "count_message"
        ).innerText = `${text.length}/30`;
      });
  }

  isFormControlValid(control: string): boolean {
    if (this.form.get(control).pristine) {
      return true;
    }
    if (this.form.get(control).valid) {
      return true;
    }
    if (this.form.status === "PENDING") {
      return true;
    }

    return false;
  }

  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.continue();
    this.router.navigate(["/preboarding/register/relationship"]);
  }

  continue() {
    this.collectGroup.name = this.form.value.inAppOrgName.trim();
    this.collectGroup.paymentReference = this.form.value.paymentReference;
    this.preboardingStateService.currentCollectGroupDetails = this.collectGroup;
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const inAppOrgNameErrors = this.form.get("inAppOrgName").errors;

    if (inAppOrgNameErrors) {
      if (inAppOrgNameErrors.trimEmptyValue || inAppOrgNameErrors.required) {
        errorMessages.push(
          this.translationService.get("errorMessages.name-in-app-required")
        );
      }
      if (inAppOrgNameErrors.maxlength) {
        errorMessages.push(
          this.translationService.get("errorMessages.name-in-app-length")
        );
      }
      if (inAppOrgNameErrors.unique) {
        errorMessages.push(
          this.translationService.get("errorMessages.unique-collectgroup-name")
        );
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
