import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IdapServiceComponent } from './idap-service.component';
import { PoliciesComponent } from './policies/policies.component';
import { CreateGroupComponent } from './user-groups/create-group/create-group.component';
import { GroupDetailsComponent } from './user-groups/group-details/group-details.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: IdapServiceComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'user-groups',
        children: [
          {
            path: '',
            component: UserGroupsComponent,
          },
          {
            path: 'create',
            component: CreateGroupComponent,
          },
          {
            path: 'details/:groupName',
            children: [
              { path: '', component: GroupDetailsComponent },
              { path: 'add-users', component: GroupDetailsComponent },
            ],
          },
        ],
      },
      { path: 'users', component: UsersComponent },
      { path: 'policies', component: PoliciesComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdapServiceRoutingModule {}
