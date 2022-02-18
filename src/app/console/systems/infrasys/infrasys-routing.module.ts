import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InfrasysComponent } from './infrasys.component';
import { SitesComponent } from './sites/sites.component';
import { CreateSiteComponent } from './create-site/create-site.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteDetailsComponent } from './details/site-details/site-details.component';
import { MySitesComponent } from './my-sites/my-sites.component';
import { FacilityDetailsComponent } from './details/facility-details/facility-details.component';

const routes: Routes = [
  {
    path: '',
    component: InfrasysComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'my-sites',
        children: [
          {
            path: '',
            component: MySitesComponent,
          },
          {
            path: 'details/:siteId',
            component: SiteDetailsComponent,
          },
          {
            path: 'details/:siteId/:facilityId',
            component: FacilityDetailsComponent,
          },
        ],
      },
      {
        path: 'sites',
        children: [
          {
            path: '',
            component: SitesComponent,
          },
          // {
          //   path: 'update',
          //   component: CreateGroupComponent,
          // },
          {
            path: 'details/:siteId',
            component: SiteDetailsComponent,
          },
          {
            path: 'details/:siteId/:facilityId',
            component: FacilityDetailsComponent,
          },
        ],
      },
      {
        path: 'create-site',
        component: CreateSiteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfrasysRoutingModule {}
