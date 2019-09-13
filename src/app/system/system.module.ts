import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SystemRootComponent } from './system-root/system-root.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';



@NgModule({
  declarations: [
    NotFoundComponent, 
    ErrorPageComponent, 
    SystemRootComponent, UnderConstructionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ]
})
export class SystemModule { }
