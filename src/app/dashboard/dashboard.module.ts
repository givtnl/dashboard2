import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardCompleteAccountWidgetComponent } from './components/dashboard-complete-account-widget/dashboard-complete-account-widget.component';
import { DashboardTileWidgetComponent } from './components/dashboard-tile-widget/dashboard-tile-widget.component';
import { DashboardLinkButtonComponent } from './components/dashboard-link-button/dashboard-link-button.component';
import { CollectGroupDashboardHomeComponent } from './collect-group-dashboard-home/collect-group-dashboard-home.component';
import { CollectGroupDashboardPeopleComponent } from './collect-group-dashboard-people/collect-group-dashboard-people.component';
import { DashboardSelectOrganisationComponent } from './select-organisation/select-organisation.component';
@NgModule({
    declarations: [
        CollectGroupDashboardHomeComponent,
        CollectGroupDashboardPeopleComponent,
        DashboardHomeComponent,
        DashboardRootComponent,
        DashboardCompleteAccountWidgetComponent,
        DashboardTileWidgetComponent,
        DashboardLinkButtonComponent,
        DashboardSelectOrganisationComponent
    ],
    imports: [ DashboardRoutingModule, CommonModule, ReactiveFormsModule, SharedModule ]
})
export class DashboardModule { }
