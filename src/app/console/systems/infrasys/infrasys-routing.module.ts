import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InfrasysComponent } from './infrasys.component';
import { SitesComponent } from './sites/sites.component';
import { CreateSiteComponent } from './create-site/create-site.component';

const routes: Routes = [
  {
    path: '',
    component: InfrasysComponent,
    children: [
      { path: '', redirectTo: 'sites', pathMatch: 'prefix' },
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
          // {
          //   path: 'details/:siteId',
          //   children: [
          //     { path: '', component: GroupDetailsComponent },
          //   ],
          // },
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
