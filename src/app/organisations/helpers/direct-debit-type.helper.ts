import { DirectDebitType } from "../enums/direct-debit.type";
import { UpdateOrganisationCommand } from "../models/commands/update-organisation.command";
import { OrganisationDetailModel } from "../models/organisation-detail.model";

export class DirectDebitTypeHelper {
    static fromOrganisationDetailModel(model: OrganisationDetailModel | UpdateOrganisationCommand) {
        switch (model.Country ?? "") {
            case "GB":
            case "GG":
            case "JE":
                return DirectDebitType.BACS;
            default:
                return DirectDebitType.SEPA;
        }
    }
} 