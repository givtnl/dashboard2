import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';

export class PreboardingStateService {
    private storage = sessionStorage;

    public clear(): void {
      this.storage.removeItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationCharityCommisionModel');
    }
    public get currentOrganisationDetails(): UpdateOrganisationCommand {
      return JSON.parse(this.storage.getItem('PreboardingStateService.currentOrganisationDetails'));
    }
    public set currentOrganisationDetails(value: UpdateOrganisationCommand) {
      this.storage.setItem('PreboardingStateService.currentOrganisationDetails', JSON.stringify(value));
    }

}