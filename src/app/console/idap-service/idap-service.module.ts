import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdapServiceRoutingModule } from './idap-service-routing.module';

import { NgxLoadingModule } from 'ngx-loading';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';

import { IdapServiceComponent } from './idap-service.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UsersComponent } from './users/users.component';
import { PoliciesComponent } from './policies/policies.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DxDataGridModule } from 'devextreme-angular';
import { GroupDetailsComponent } from './user-groups/group-details/group-details.component';
import { CreateGroupComponent } from './user-groups/create-group/create-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

@NgModule({
  declarations: [
    IdapServiceComponent,
    SidebarComponent,
    DashboardComponent,
    UserGroupsComponent,
    UsersComponent,
    PoliciesComponent,
    AccountSettingsComponent,
    GroupDetailsComponent,
    CreateGroupComponent,
    CreateUserComponent,
    UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    IdapServiceRoutingModule,
    DxDataGridModule,
    NgxLoadingModule,
    NgbNavModule,
    ReactiveFormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IdapServiceModule {}
