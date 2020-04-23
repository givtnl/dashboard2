import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-preboarding-organisation-address-details',
  templateUrl: './preboarding-organisation-address-details.component.html',
  styleUrls: ['./preboarding-organisation-address-details.component.scss']
})
export class PreboardingOrganisationAddressDetailsComponent implements OnInit {

  public form: FormGroup;
  public loading = false;

  constructor(private fb: FormBuilder, private stateService: PreboardingStateService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required, notNullOrEmptyValidator()]],
      addressLine1: [null, [Validators.required, notNullOrEmptyValidator()]],
      addressLine2: [null, [Validators.required, notNullOrEmptyValidator()]],
      addressLine3: [null],
      addressLine4: [null],
      addressLine5: [null],
      postalCode: [null, [Validators.required, notNullOrEmptyValidator()]],
      city: [null, [Validators.required, notNullOrEmptyValidator()]]
    });
  }

  submit(): void {
    // if (this.form.invalid) {
    //   this.handleInvalidForm();
    //   return;
    // } else {
      this.continue();
    //}
  }

  handleInvalidForm(): void {

  }

  continue(): void {
    this.stateService.currentOrganisationDetails = this.form.getRawValue();
    this.loading = true;
    this.router.navigate(['/', 'preboarding', 'register', 'collection-medium-details']).finally(() => this.loading = false);
  }

}
