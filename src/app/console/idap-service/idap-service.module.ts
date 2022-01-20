import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdapServiceRoutingModule } from './idap-service-routing.module';

import { NgxLoadingModule } from 'ngx-loading';

import { IdapServiceComponent } from './idap-service.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UsersComponent } from './users/users.component';
import { PoliciesComponent } from './policies/policies.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    IdapServiceComponent,
    SidebarComponent,
    DashboardComponent,
    UserGroupsComponent,
    UsersComponent,
    PoliciesComponent,
    AccountSettingsComponent,
  ],
  imports: [CommonModule, IdapServiceRoutingModule, DxDataGridModule, NgxLoadingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IdapServiceModule {}
