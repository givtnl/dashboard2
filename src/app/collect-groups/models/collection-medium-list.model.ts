export enum CollectionMediumType {
    Other = 0,
    QrCodeDefault = 1,
    QrCodeWebOnly = 2,
    QrCodeKDGM = 3
}

export interface CollectionMediumListModel {
    Name:string;
    MediumId: string;
}