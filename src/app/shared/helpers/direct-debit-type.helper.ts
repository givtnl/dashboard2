import { DirectDebitType } from "../enums/direct-debit.type";
import { UpdateOrganisationCommand } from "../../organisations/models/commands/update-organisation.command";
import { OrganisationDetailModel } from "../../organisations/models/organisation-detail.model";
import { PreboardingDetailModel } from "src/app/preboarding/models/preboarding-detail.model";
import { OrganisationListModel } from "src/app/organisations/models/organisation-list.model";

export class DirectDebitTypeHelper {
    static fromOrganisationDetailModel(model: OrganisationDetailModel | UpdateOrganisationCommand | OrganisationListModel) : DirectDebitType {
        return this.CountryToDirectDebitType(model.Country ?? "");
    }

    static fromPreboardingDetailModel(model: PreboardingDetailModel): DirectDebitType {
        return this.CountryToDirectDebitType(model.country);
    }

    static CountryToDirectDebitType(country: string): DirectDebitType {
        switch (country.toUpperCase()) {
            case "GB":
            case "GG":
            case "JE":
                return DirectDebitType.BACS;
            default:
                return DirectDebitType.SEPA;
        }    
    }
} 