import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { forkJoin, Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { futureDateValidator } from "src/app/shared/validators/date.validator";
import { SetLaunchDateCommand } from "../models/set-launch-date.command";
import { PreboardingStateService } from "../services/preboarding-state.service";


@Component({
  selector: 'app-preboarding-launch-date',
  templateUrl: './preboarding-launch-date.component.html',
  styleUrls: ['./preboarding-launch-date.component.scss']
})
export class PreboardingLaunchDateComponent implements OnInit {

  private launchDate: SetLaunchDateCommand
  public form: FormGroup
  public selector: Number
  public minDate: Date

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translationService: TranslateService,
    private toastr: ToastrService,
    private stateService: PreboardingStateService,
    private router: Router) { }


  ngOnInit(): void {
    this.launchDate = this.route.snapshot.data.launchDate as SetLaunchDateCommand ?? new SetLaunchDateCommand();
    this.form = this.formBuilder.group({
      selector: [this.launchDate.launchDate ? 2 : 0],
      launchDate: new FormControl(this.launchDate.launchDate ? this.launchDate.launchDate : null, futureDateValidator())
    });
    this.minDate = new Date()
  }


  submit() {
    console.log('oi')
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.continue();
    this.router.navigate(["/preboarding/register/collections"])
  }


  continue() {
    switch (this.form.value.selector) {
      case 1:
        this.launchDate.launchDate = new Date().toISOString().slice(0, 10) as any
        break
      case 2:
        this.launchDate.launchDate = this.form.value.launchDate
        break
      default:
        this.launchDate.launchDate = null
    }
    this.stateService.currentSetLaunchDateCommand = this.launchDate
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const dateErrors = this.form.get('launchDate').errors;

    if (dateErrors) {
      console.log(dateErrors)
      if (dateErrors.datevalid) {
        errorMessages.push(this.translationService.get('errorMessages.past-date'));
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