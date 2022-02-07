import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdapServiceRoutingModule } from './idap-service-routing.module';

import { NgxLoadingModule } from 'ngx-loading';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';

import { IdapServiceComponent } from './idap-service.component';
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
import { AddToGroupComponent } from './user-groups/add-to-group/add-to-group.component';
import { PolicyDetailsComponent } from './policies/policy-details/policy-details.component';
import { CreatePolicyComponent } from './policies/create-policy/create-policy.component';
import { ConsoleModule } from '../../console.module';

@NgModule({
  declarations: [
    IdapServiceComponent,
    DashboardComponent,
    UserGroupsComponent,
    UsersComponent,
    PoliciesComponent,
    AccountSettingsComponent,
    GroupDetailsComponent,
    CreateGroupComponent,
    CreateUserComponent,
    UserDetailsComponent,
    AddToGroupComponent,
    PolicyDetailsComponent,
    CreatePolicyComponent,
  ],
  imports: [
    CommonModule,
    IdapServiceRoutingModule,
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
export class IdapServiceModule {}
