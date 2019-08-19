import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OnboardingStateService } from '../services/onboarding-state.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-onboarding-personal-details',
	templateUrl: './onboarding-personal-details.component.html',
	styleUrls: [ './onboarding-personal-details.component.scss' ]
})
export class OnboardingPersonalDetailsComponent implements OnInit {
	public form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private stateService: OnboardingStateService,
		private router: Router,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		this.form = this.formBuilder.group({
			firstName: [ null, [ Validators.required, Validators.minLength(2), Validators.maxLength(15) ] ],
			lastName: [ null, [ Validators.required, Validators.minLength(2), Validators.maxLength(30) ] ]
		});
	}

	submit() {
		if (this.form.invalid) {
			this.handleInvalidForm();
			return;
		}
		const currentRegisterModel = this.stateService.currentRegisterModel;
		currentRegisterModel.firstName = this.form.value.firstName;
		currentRegisterModel.lastName = this.form.value.lastName;

		this.stateService.currentRegisterModel = currentRegisterModel;
		this.router.navigate([ '/', 'onboarding', 'completed' ], {
			queryParamsHandling: 'merge'
		});
	}

	handleInvalidForm() {
		const errorMessages = [];

		const firstNameErrors = this.form.get('firstName').errors;
		const lastNameErrors = this.form.get('lastName').errors;

		if (firstNameErrors) {
			if (firstNameErrors.required) {
				errorMessages.push('todo translate Naam is verplicht');
			}
			if (firstNameErrors.minlength) {
				errorMessages.push('todo translate Naam minstens 2 tekens');
			}
			if (firstNameErrors.maxlength) {
				errorMessages.push('todo translate Naam max 15 tekens');
			}
		}

		if (lastNameErrors) {
			if (lastNameErrors.required) {
				errorMessages.push('todo translate achternaam is verplicht');
			}
			if (lastNameErrors.minlength) {
				errorMessages.push('todo translate achternaam is minstens 2tekens');
			}
			if (lastNameErrors.maxlength) {
				errorMessages.push('todo translate achternaam max 15 tekens');
			}
		}

		this.toastr.warning(errorMessages.join('<br>'), 'todo translate Validatiefout', {
			enableHtml: true
		});
	}
}
