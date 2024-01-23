import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SystemRootComponent } from './system-root/system-root.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
const routes: Routes = [
  {
    path: "root",
    component: SystemRootComponent,
    children: [
      {
        path: "",
        component: ErrorPageComponent,
        outlet: "system-outlet",
        pathMatch: 'full',
      },
      {
        path: "error",
        component: ErrorPageComponent,
        outlet: "system-outlet",
      },
      {
        path: "not-found",
        component: NotFoundComponent,
        outlet: "system-outlet",
      },
      {
        path: "under-construction",
        component: UnderConstructionComponent,
        outlet: "system-outlet",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
