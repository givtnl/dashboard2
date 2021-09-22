import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { forkJoin, Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { CreateCollectGroupCommand } from "src/app/collect-groups/models/create-collect-group.command";
import { SetLaunchDateCommand } from "../models/set-launch-date.command";


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
        private router: Router) { }
    

    ngOnInit(): void {
        this.launchDate = this.route.snapshot.data.launchDate as SetLaunchDateCommand;

        this.form = this.formBuilder.group({
            selector: [this.selector],
            launchDate: [this.launchDate],
          });

        this.form.controls['selector'].setValue(1, {onlySelf: true})
        this.minDate = new Date()
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
          // add the launch date to the organisation
      }
    
      handleInvalidForm() {
        let errorMessages = new Array<Observable<string>>();
        let resolvedErrorMessages = new Array<string>();
        
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