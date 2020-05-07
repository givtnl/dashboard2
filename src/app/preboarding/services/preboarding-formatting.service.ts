import { Injectable } from '@angular/core';
import { CreatePreboardingAdditionalInformationCommand, PreboardingCollectionDetailType, PreboardingCollectionDetail } from '../models/create-preboarding-additional-information.command';
import { CreateOrganisationContactCommand } from 'src/app/organisations/models/commands/create-organisation-contact.command';
import { PreboardingDetailModel } from '../models/preboarding-detail.model';

@Injectable({
   providedIn: 'root'
})
export class PreboardingFormattingService {
   public formatContact(command: CreateOrganisationContactCommand): string {
      let result = 'Contact info \n';
      result += `Address: ${command.address}\n`;
      result += `City: ${command.city}\n`;
      result += `Postcode: ${command.postCode}\n`;
      result += `Note: ${command.comments}\n`;
      return result;
   }
   public formatInfo(command: CreatePreboardingAdditionalInformationCommand): string {

      let result = 'Additional information\n';

      if (command.singleCollectionService && command.singleCollectionService.enabled) {
         result += 'single collection\n';
         result += this.formatDetails(command.singleCollectionService.details);
      }

      if (command.multipleCollectionService && command.multipleCollectionService.enabled) {
         result += 'multiple collections\n';
         result += this.formatDetails(command.multipleCollectionService.details);
      }
      if (command.endOfServiceCollection && command.endOfServiceCollection.enabled) {
         result += 'end of service collection\n';
         result += this.formatDetails(command.endOfServiceCollection.details);
      }

      if (command.candleCollection && command.candleCollection.enabled) {
         result += 'candle collection\n';
         result += this.formatDetails(command.candleCollection.details);
      }

      if (command.communionCollection && command.communionCollection.enabled) {
         result += 'communion collection\n';
         result += this.formatDetails(command.communionCollection.details);
      }

      return result;
   }

   private formatDetails(details: PreboardingCollectionDetail[]): string {
      return `${details.map(detail => this.formatDetail(detail)).join('\n')}\n`;
   }

   private formatDetail(detail: PreboardingCollectionDetail): string {
      return `Type: ${PreboardingCollectionDetailType[detail.collectionType]} Quantity: ${detail.quantity || 0}`
   }
}
