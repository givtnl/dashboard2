import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OnboardingRequestModel } from '../models/onboarding-request.model';
import { OnboardingStateService } from '../services/onboarding-state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-onboarding-welcome',
	templateUrl: './onboarding-welcome.component.html',
	styleUrls: [ './onboarding-welcome.component.scss' ]
})
export class OnboardingWelcomeComponent implements OnInit {
	public form: FormGroup;
	public request: OnboardingRequestModel;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private toastr: ToastrService,
		private router: Router,
		private stateService: OnboardingStateService
	) {}

	ngOnInit() {
		// since this is the first step, retrieve the request from the route and store it in our stateService
		const currentRequest = this.route.parent.snapshot.data.request;

		this.stateService.currentOnboardingRequest = currentRequest;
		this.request = currentRequest;

		// todo retrieve email and companyname from route
		this.form = this.formBuilder.group({
			email: [ this.route.snapshot.queryParams.email, [ Validators.required, Validators.email ] ],
			password: [ null, [ Validators.required, Validators.minLength(7) ] ]
		});
	}

	submit() {
		if (this.form.invalid) {
			this.handleInvalidForm();
			return;
		}
		const currentRegisterModel = this.stateService.currentRegisterModel || { email: null, password: null };
		currentRegisterModel.email = this.form.value.email;
		currentRegisterModel.password = this.form.value.password;

		this.stateService.currentRegisterModel = currentRegisterModel;
		this.router.navigate([ '/', 'onboarding', 'register' ], {
			preserveQueryParams: true
		});
	}

	handleInvalidForm() {
		const errorMessages = [];

		const emailErrors = this.form.get('email').errors;
		const passwordErrors = this.form.get('password').errors;

		if (emailErrors) {
			const emailErrors = this.form.get('email').errors;
			if (emailErrors.required) {
				errorMessages.push('todo translate Email is verplicht');
			}
			if (emailErrors.email) {
				errorMessages.push('todo translate Ongeldig emailadrs');
			}
		}

		if (passwordErrors) {
			if (passwordErrors.required) {
				errorMessages.push('todo translate Wachtwoord is verplicht');
			}
			if (passwordErrors.minlength) {
				errorMessages.push('todo translate Wachtwoord is minstens 7 tekens');
			}
		}

		this.toastr.warning(errorMessages.join('<br>'), 'todo translate Validatiefout', {
			enableHtml: true
		});
	}
}
