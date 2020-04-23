import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-preboarding-collection-medium-details',
  templateUrl: './preboarding-collection-medium-details.component.html',
  styleUrls: ['./preboarding-collection-medium-details.component.scss', '../../preboarding/preboarding.module.scss',]
})
export class PreboardingCollectionMediumDetailsComponent implements OnInit {

  form: FormGroup
  constructor(
    private formBuilder: FormBuilder, 
    private translationService: TranslateService, 
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      numberOfVisitors: [null, [Validators.required]],
      numberOfCollectionBags: [null, [Validators.required]], 
    });
  }
  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.router.navigate(["/preboarding/register/organisation-admin-details"])
  }
  
  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const numberOfVisitorsErrors = this.form.get('numberOfVisitors').errors;
    const numberOfCollectionBagsErrors = this.form.get('numberOfCollectionBags').errors;

    if (numberOfVisitorsErrors) {
      if (numberOfVisitorsErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.number-of-visitors-required'));
      }
    }
    if (numberOfCollectionBagsErrors) {
      if (numberOfCollectionBagsErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.number-of-collectionbags-required'));
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
