import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { CollectGroupDashboardHomeComponent } from './collect-group-dashboard-home/collect-group-dashboard-home.component';
import { CollectGroupDashboardPeopleComponent } from './collect-group-dashboard-people/collect-group-dashboard-people.component';
import { CollectGroupContactsResolver } from './resolvers/collect-group-contacts.resolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'root'
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
                outlet: 'dashboard-outlet',
            },
            {
                path: 'collect-group-home',
                component: CollectGroupDashboardHomeComponent,
                outlet: 'dashboard-outlet'
            },
            {
                path: 'collect-group-people',
                component: CollectGroupDashboardPeopleComponent,
                outlet: 'dashboard-outlet',
                resolve: { contacts: CollectGroupContactsResolver }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
