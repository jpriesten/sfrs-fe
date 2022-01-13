import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IamServiceComponent } from './iam-service.component';

const routes: Routes = [
  {
    path: '',
    component: IamServiceComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IamServiceRoutingModule {}
