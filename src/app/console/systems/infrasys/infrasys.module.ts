import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfrasysComponent } from './infrasys.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DxDataGridModule } from 'devextreme-angular';
import { NgxLoadingModule } from 'ngx-loading';
import { ConsoleModule } from '../../console.module';
import { InfrasysRoutingModule } from './infrasys-routing.module';
import { SitesComponent } from './sites/sites.component';
import { CreateSiteComponent } from './create-site/create-site.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteDetailsComponent } from './sites/site-details/site-details.component';

@NgModule({
  declarations: [
    InfrasysComponent,
    SitesComponent,
    CreateSiteComponent,
    DashboardComponent,
    SiteDetailsComponent,
  ],
  imports: [
    CommonModule,
    InfrasysRoutingModule,
    DxDataGridModule,
    NgxLoadingModule,
    NgbNavModule,
    NgbCollapseModule,
    ReactiveFormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    ConsoleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InfrasysModule {}
