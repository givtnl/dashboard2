import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-giftaid-verify-personal-details',
  templateUrl: './giftaid-verify-personal-details.component.html',
  styleUrls: ['./giftaid-verify-personal-details.component.scss']
})
export class GiftaidVerifyPersonalDetailsComponent implements OnInit {
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
        { outlets: { 'onboarding-outlet': [value.detailsCorrect ? 'completed' : 'authorised-official-details'] } }],
        { queryParamsHandling: 'merge' }
      ).finally(() => this.loading = false)
    })
  }
  private get currentSettings(): PreparedGiftAidSettings {
    return this.activatedRoute.parent.snapshot.data.giftAidSettings;
  }
}
