import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'root'
  },
  {
    path: 'root',
    component: DashboardRootComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        outlet: 'dashboard-outlet'

      },
      {
        path: 'home',
        component: DashboardHomeComponent,
        outlet: 'dashboard-outlet'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
