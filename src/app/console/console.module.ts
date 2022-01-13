import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleRoutingModule } from './console-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ConsoleComponent } from './console.component';
import { HomeComponent } from './home/home.component';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    ConsoleComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [CommonModule, ConsoleRoutingModule, DxDataGridModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConsoleModule {}
