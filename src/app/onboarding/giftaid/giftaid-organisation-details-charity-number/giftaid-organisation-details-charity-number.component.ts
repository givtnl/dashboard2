import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-giftaid-organisation-details-charity-number',
  templateUrl: './giftaid-organisation-details-charity-number.component.html',
  styleUrls: ['./giftaid-organisation-details-charity-number.component.scss']
})
export class GiftaidOrganisationDetailsCharityNumberComponent implements OnInit {

  public form: FormGroup
  public loading = false
  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      charityNumber: [null, [Validators.required]],
      charityId: [null, [Validators.required]]
    });
  }
  submit() {
  
  }
}
