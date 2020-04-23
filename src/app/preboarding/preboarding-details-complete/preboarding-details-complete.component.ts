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
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }



}
