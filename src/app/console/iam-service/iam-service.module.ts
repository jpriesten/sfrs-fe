import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IamServiceRoutingModule } from './iam-service-routing.module';
import { IamServiceComponent } from './iam-service.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    IamServiceComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [CommonModule, IamServiceRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IamServiceModule {}
