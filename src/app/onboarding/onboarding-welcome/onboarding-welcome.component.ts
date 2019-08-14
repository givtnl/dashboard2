import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-onboarding-welcome',
    templateUrl: './onboarding-welcome.component.html',
    styleUrls: ['./onboarding-welcome.component.scss']
})
export class OnboardingWelcomeComponent implements OnInit {
    public form: FormGroup;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {}

    ngOnInit() {
      // todo retrieve email and companyname from route
      this.form = this.formBuilder.group({
        email:[this.route.snapshot.queryParams.email,[Validators.required, Validators.email]],
        password:[null]
      })
    }
}
