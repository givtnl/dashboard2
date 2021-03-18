import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-preboarding-welcome-details',
  templateUrl: './preboarding-welcome-details.component.html',
  styleUrls: ['./preboarding-welcome-details.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingWelcomeDetailsComponent implements OnInit{

    constructor(private translateService: TranslateService) { }

    public description: string
    
    async ngOnInit(): Promise<void> {
        let description = await this.translateService.get("preboardingWelcomeDetailsComponent.description").toPromise() as string;
        this.description = description.replace("[LINK]", await this.translateService.get("preboardingWelcomeDetailsComponent.privacyLink").toPromise());
    }
}
