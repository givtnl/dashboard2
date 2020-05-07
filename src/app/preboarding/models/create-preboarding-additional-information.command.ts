export interface CreatePreboardingAdditionalInformationCommand {
    singleCollectionService: PreboardingCollectionDescription;
    multipleCollectionService: PreboardingCollectionDescription;
    endOfServiceCollection: PreboardingCollectionDescription;
    communionCollection: PreboardingCollectionDescription;
    candleCollection: PreboardingCollectionDescription;
}


export interface PreboardingCollectionDescription {
    enabled: boolean | false;
    details: PreboardingCollectionDetail[];
}

export interface PreboardingCollectionDetail {
    quantity?: number | 0;
    collectionType?: PreboardingCollectionDetailType | null;
}
export enum PreboardingCollectionDetailType {
Bags = 0,
Buckets = 1,
Plates = 2,
Boxes = 3
}

