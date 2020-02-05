import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';

@Component({
  selector: 'app-giftaid-verify-organisation-details',
  templateUrl: './giftaid-verify-organisation-details.component.html',
  styleUrls: ['./giftaid-verify-organisation-details.component.scss']
})
export class GiftaidVerifyOrganisationDetailsComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public giftAidSettings: PreparedGiftAidSettings;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // setup form
    this.form = this.formBuilder.group({
      detailsCorrect: [null, [Validators.required]]
    });

    // load gift aid settings
    this.giftAidSettings = this.currentSettings;

    // listen to value change
    this.form.valueChanges.subscribe(value => {
      this.loading = true;
      this.router.navigate(['/', 'onboarding', 'giftaid',
        { outlets: { 'onboarding-outlet': [value.detailsCorrect ? 'completed' : 'organisation-charity-details'] } }],
        { queryParamsHandling: 'merge' }
      ).finally(() => this.loading = false)
    })
  }
  private get currentSettings(): PreparedGiftAidSettings {
    return this.activatedRoute.parent.snapshot.data.giftAidSettings;
  }
}
