import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'onboarding',
    loadChildren:() => import('./onboarding/onboarding.module').then(mod => mod.OnboardingModule)
  },
  {
    path:'',
    redirectTo:'onboarding',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
