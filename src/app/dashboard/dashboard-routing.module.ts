import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { CollectGroupDashboardHomeComponent } from './collect-group-dashboard-home/collect-group-dashboard-home.component';
import { DashboardSelectOrganisationComponent } from './select-organisation/select-organisation.component';
import { RetrieveOrganisationsGuard } from './guards/retrieve-organisations.guard';
import { OrganisationsResolver } from './resolvers/organisations.resolver';
import { DashboardUsersComponent } from './dashboard-users/dashboard-users.component';
import { OrganisationResolver } from './resolvers/organisation.resolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'root',
        pathMatch: 'full'
    },
    {
        path: 'root',
        component: DashboardRootComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                outlet: 'dashboard-outlet',
                pathMatch: 'full',
            },
            {
                path: 'home',
                component: DashboardHomeComponent,
                outlet: 'dashboard-outlet',
                canActivate: [RetrieveOrganisationsGuard],
                resolve: { organisation: OrganisationResolver }
            },
            {
                path: 'users',
                component: DashboardUsersComponent,
                outlet: 'dashboard-outlet'
            },
            {
                path: 'collect-group-home',
                component: CollectGroupDashboardHomeComponent,
                outlet: 'dashboard-outlet'
            }
        ]
    },
    {
        path: 'select-organisation',
        component: DashboardSelectOrganisationComponent,
        resolve: { organisations: OrganisationsResolver }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
