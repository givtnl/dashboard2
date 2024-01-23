import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import mixpanel from "mixpanel-browser";
import { DirectDebitType } from "src/app/shared/enums/direct-debit.type";
import { DirectDebitTypeHelper } from "src/app/shared/helpers/direct-debit-type.helper";
import { PreboardingStateService } from "../services/preboarding-state.service";

@Component({
  selector: "app-preboarding-welcome-details",
  templateUrl: "./preboarding-welcome-details.component.html",
  styleUrls: [
    "./preboarding-welcome-details.component.scss",
    "../../preboarding/preboarding.module.scss",
  ],
})
export class PreboardingWelcomeDetailsComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    @Inject("BROWSER_LOCATION") private browserLocation: any,
    private preboardingStateService: PreboardingStateService
  ) {}

  public description: string;
  privacyLink: string;
  accepted: UntypedFormControl = new UntypedFormControl("");

  async ngOnInit(): Promise<void> {
    mixpanel.identify(
      this.preboardingStateService.organisationDetails.organisationId
    );
    mixpanel.track("preboarding:begin");

    const [descriptionKey, legalNameKey, privacyLinkKey] =
      DirectDebitTypeHelper.fromPreboardingDetailModel(
        this.preboardingStateService.organisationDetails
      ) == DirectDebitType.BACS
        ? [
            "preboardingWelcomeDetailsComponent.description",
            "preboardingWelcomeDetailsComponent.legalNameGB",
            "preboardingWelcomeDetailsComponent.privacyLinkGB",
          ]
        : this.browserLocation.hostname.endsWith("givtapp.net")
        ? [
            "preboardingWelcomeDetailsComponent.description",
            "preboardingWelcomeDetailsComponent.legalName",
            "preboardingWelcomeDetailsComponent.privacyLink",
          ]
        : [
            "preboardingWelcomeDetailsComponent.description",
            "preboardingWelcomeDetailsComponent.legalName",
            "preboardingWelcomeDetailsComponent.privacyLinkUS",
          ];

    const [translatedDescription, translatedPrivacyLink, translatedLegalName] =
      await Promise.all([
        this.translateService.get(descriptionKey).toPromise(),
        this.translateService.get(privacyLinkKey).toPromise(),
        this.translateService.get(legalNameKey).toPromise(),
      ]);

    this.privacyLink = translatedPrivacyLink;
    this.description = translatedDescription
      .replace("[LINK]", translatedPrivacyLink)
      .replace("[LEGALNAME]", translatedLegalName);
  }
}
