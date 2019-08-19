import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OnboardingService } from '../services/onboarding.service';
import { OnboardingRequestModel } from '../models/onboarding-request.model';
import { OnboardingStateService } from '../services/onboarding-state.service';

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
}
