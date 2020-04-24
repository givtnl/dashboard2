export interface CreatePreboardingAdditionalInformationCommand {
    singleCollectionService: PreboardingCollectionDescription;
    multipleCollectionService: PreboardingCollectionDescription;
    endOfServiceCollection: PreboardingCollectionDescription;
    communionCollection: PreboardingCollectionDescription;
    candleCollection: PreboardingCollectionDescription;
    collectionBoxes: PreboardingCollectionDescription;
}


export interface PreboardingCollectionDescription {
    enabled: boolean | false;
    quantity?: number | 0;
    collectionType?: string | null;
}