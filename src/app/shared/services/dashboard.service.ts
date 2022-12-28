import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CollectGroupDashboardListModel } from "../models/collect-group-side-bar-list.model";
import { EventEmitter } from "@angular/core";
import { CollectGroupsService } from "src/app/collect-groups/services/collect-groups.service";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { map } from "rxjs/operators";
import { CollectGroupType } from "../enums/collect-group-type.enum";
import { OrganisationListModel } from "src/app/organisations/models/organisation-list.model";
import { DashboardPage } from "../enums/dashboard-page.enum";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private storage = sessionStorage;

  public currentCollectGroupChange =
    new EventEmitter<CollectGroupDashboardListModel>();
  public currentOrganisationChange = new EventEmitter<OrganisationListModel>();

  get hasMultipleOrganisations(): boolean {
    const key = "DashboardService.HasMultipleOrganisations";
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest;
  }

  set hasMultipleOrganisations(value: boolean) {
    const key = "DashboardService.HasMultipleOrganisations";
    this.storage.setItem(key, JSON.stringify(value));
  }

  get currentOrganisation(): OrganisationListModel {
    const key = "DashboardService.CurrentOrganisation";
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest;
  }

  set currentOrganisation(organisation: OrganisationListModel) {
    const key = "DashboardService.CurrentOrganisation";
    this.storage.setItem(key, JSON.stringify(organisation));
    this.currentOrganisationChange.emit(organisation);
  }

  get currentCollectGroup(): CollectGroupDashboardListModel {
    const key = "DashboardService.CurrentCollectGroup";
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest;
  }

  set currentCollectGroup(collectGroup: CollectGroupDashboardListModel) {
    const key = "DashboardService.CurrentCollectGroup";
    this.storage.setItem(key, JSON.stringify(collectGroup));
    this.currentCollectGroupChange.emit(collectGroup);
  }

  set currentDashboardPage(page: DashboardPage) {
    const key = "DashboardService.CurrentDashboardPage";
    this.storage.setItem(key, JSON.stringify(page));
  }

  get currentDashboardPage(): DashboardPage {
    const key = "DashboardService.CurrentDashboardPage";
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest === undefined || serializedRequest === null
      ? DashboardPage.Dashboard
      : serializedRequest;
  }

  public clear() {
    this.storage.removeItem("DashboardService.CurrentCollectGroup");
    this.storage.removeItem("DashboardService.CurrentDashboardPage");
    this.storage.removeItem("DashboardService.CurrentOrganisation");
    this.storage.removeItem("DashboardService.HasMultipleOrganisations");
  }

  constructor(
    private collectGroupsService: CollectGroupsService,
    private applicationStateService: ApplicationStateService
  ) {}

  public getCollectGroups(): Observable<CollectGroupDashboardListModel[]> {
    return this.collectGroupsService
      .getAll(this.applicationStateService.currentTokenModel.OrganisationAdmin)
      .pipe(
        map((x) =>
          x.map((y) => ({
            GUID: y.Id,
            CollectGroupType: y.Type,
            CollectGroupTypeDescription: CollectGroupType[y.Type],
            Name: y.Name,
          }))
        )
      );
  }
}
