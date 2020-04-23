import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';

@Component({
  selector: 'app-preboarding-details-complete',
  templateUrl: './preboarding-details-complete.component.html',
  styleUrls: ['./preboarding-details-complete.component.scss']
})
export class PreboardingDetailsCompleteComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private stateService: PreboardingStateService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required, notNullOrEmptyValidator()]],
      addressLineOne: [null, [Validators.required, notNullOrEmptyValidator()]],
      addressLineTwo: [null, [Validators.required, notNullOrEmptyValidator()]],
      addressLineThree: [null],
      addressLineFour: [null],
      addressLineFive: [null],
      postalCode: [null, [Validators.required, notNullOrEmptyValidator()]],
      country: [null, [Validators.required, notNullOrEmptyValidator()]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    } else {
      this.continue();
    }
  }

  handleInvalidForm(): void {

  }

  continue(): void {
    this.stateService.currentOrganisationDetails = this.form.getRawValue();
  }

}
