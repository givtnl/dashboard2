import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OnboardingStateService } from '../services/onboarding-state.service';
import { Router } from '@angular/router';

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
		private router: Router
	) {}

	ngOnInit() {
		this.form = this.formBuilder.group({
			firstName: [ null, [ Validators.required, Validators.minLength(2), Validators.maxLength(15) ] ],
			lastName: [ null, [ Validators.required, Validators.minLength(2), Validators.maxLength(30) ] ]
		});
	}

	submit() {
		const currentRegisterModel = this.stateService.currentRegisterModel;
		currentRegisterModel.firstName = this.form.value.firstName;
		currentRegisterModel.lastName = this.form.value.lastName;

		this.stateService.currentRegisterModel = currentRegisterModel;
		this.router.navigate([ '/', 'onboarding', 'completed' ], {
			preserveQueryParams: true
		});
	}
}
