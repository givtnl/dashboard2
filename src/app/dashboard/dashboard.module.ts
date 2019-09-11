import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ DashboardHomeComponent, DashboardRootComponent],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
