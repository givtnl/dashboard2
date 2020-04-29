import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreboardingStateService } from '../services/preboarding-state.service';


@Component({
  selector: 'app-preboarding-welcome-details',
  templateUrl: './preboarding-welcome-details.component.html',
  styleUrls: ['./preboarding-welcome-details.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingWelcomeDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private preboardingStateService: PreboardingStateService) { }
  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      alert(JSON.stringify(queryParams));
      this.preboardingStateService.organisationDetails = {
        country: queryParams.get("country"),
        type: Number(queryParams.get("type"))
      }
    })

    alert(JSON.stringify(this.preboardingStateService.organisationDetails, null, 4))
  }

}
