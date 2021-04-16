import { CollectGroupType } from "src/app/shared/enums/collect-group-type.enum";

export interface CollectGroupListModel {
    Id: string;
    Name: string;
    Namespace: string;
    AccountId?: number;
    CreationDate: Date;
    Type: CollectGroupType
}