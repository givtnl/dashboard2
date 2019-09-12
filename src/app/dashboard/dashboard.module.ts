import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardCompleteAccountWidgetComponent } from './components/dashboard-complete-account-widget/dashboard-complete-account-widget.component';
import { DashboardTileWidgetComponent } from './components/dashboard-tile-widget/dashboard-tile-widget.component';



@NgModule({
  declarations: [ DashboardHomeComponent, DashboardRootComponent, DashboardCompleteAccountWidgetComponent,  DashboardTileWidgetComponent],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
