import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import mixpanel from 'mixpanel-browser';
import { DirectDebitType } from 'src/app/shared/enums/direct-debit.type';
import { DirectDebitTypeHelper } from 'src/app/shared/helpers/direct-debit-type.helper';
import { PreboardingStateService } from '../services/preboarding-state.service';


@Component({
  selector: 'app-preboarding-welcome-details',
  templateUrl: './preboarding-welcome-details.component.html',
  styleUrls: ['./preboarding-welcome-details.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingWelcomeDetailsComponent implements OnInit{

    constructor(private translateService: TranslateService, private preboardingStateService: PreboardingStateService) { }

    public description: string
    
    async ngOnInit(): Promise<void> {
        mixpanel.identify(this.preboardingStateService.organisationDetails.organisationId);
        mixpanel.track("preboarding:begin");
        let description = await this.translateService.get("preboardingWelcomeDetailsComponent.description").toPromise() as string;
        if (DirectDebitTypeHelper.fromPreboardingDetailModel(this.preboardingStateService.organisationDetails) == DirectDebitType.BACS) {
            this.description = description
                .replace("[LINK]", await this.translateService.get("preboardingWelcomeDetailsComponent.privacyLinkGB").toPromise())
                .replace("[LEGALNAME]", await this.translateService.get("preboardingWelcomeDetailsComponent.legalNameGB").toPromise());
        } else {
            this.description = description
                .replace("[LINK]", await this.translateService.get("preboardingWelcomeDetailsComponent.privacyLink").toPromise())
                .replace("[LEGALNAME]", await this.translateService.get("preboardingWelcomeDetailsComponent.legalName").toPromise());
        }
    }
}
