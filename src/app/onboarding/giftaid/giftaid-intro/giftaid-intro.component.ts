import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-giftaid-intro',
  templateUrl: './giftaid-intro.component.html',
  styleUrls: ['./giftaid-intro.component.scss']
})
export class GiftaidIntroComponent implements OnInit {
  public form: FormGroup;
  public isLoading = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      answer: [null, [Validators.required]]
    });

    this.form.valueChanges.subscribe(x => {
      if(x.answer) {
        this.isLoading = true
        this.router.navigate(['/', 'onboarding', 'giftaid', { outlets: { 'onboarding-outlet': ['organisation-details'] } }], {
          queryParamsHandling: 'merge'
        }).finally(() => this.isLoading = false)
      }
      else {
        this.isLoading = true
        this.router.navigate(['/', 'dashboard'], {
          queryParamsHandling: 'merge'
        }).finally(() => this.isLoading = false)
      }
    });
  }

}
