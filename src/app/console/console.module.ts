import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleRoutingModule } from './console-routing.module';

import { NgxLoadingModule } from 'ngx-loading';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ConsoleComponent } from './console.component';
import { HomeComponent } from './home/home.component';
import { DxDataGridModule } from 'devextreme-angular';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RemotePaginationComponent } from '../components/remote-pagination/remote-pagination.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConsoleComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidebarComponent,
    RemotePaginationComponent,
  ],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    FormsModule,
    DxDataGridModule,
    NgxLoadingModule,
  ],
  exports: [SidebarComponent, RemotePaginationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConsoleModule {}
