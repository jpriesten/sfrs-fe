import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InfrasysComponent } from './infrasys.component';
import { SitesComponent } from './sites/sites.component';
import { CreateSiteComponent } from './create-site/create-site.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteDetailsComponent } from './sites/site-details/site-details.component';
import { MySitesComponent } from './my-sites/my-sites.component';

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
