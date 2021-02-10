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
@NgModule({
  declarations: [ CollectGroupDashboardHomeComponent, DashboardHomeComponent, DashboardRootComponent, DashboardCompleteAccountWidgetComponent,  DashboardTileWidgetComponent, DashboardLinkButtonComponent],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
