import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-onboarding-personal-details',
	templateUrl: './onboarding-personal-details.component.html',
	styleUrls: [ './onboarding-personal-details.component.scss' ]
})
export class OnboardingPersonalDetailsComponent implements OnInit {
	public form: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
				this.form = this.formBuilder.group({
			firstName: [ null, [ Validators.required, Validators.minLength(2), Validators.maxLength(15) ] ],
			lastName: [ null, [ Validators.required, Validators.minLength(2), Validators.maxLength(30) ] ]
		});
	}
}
