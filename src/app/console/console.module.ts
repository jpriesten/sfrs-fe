import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleRoutingModule } from './console-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ConsoleComponent } from './console.component';
import { HomeComponent } from './home/home.component';
import { DxDataGridModule } from 'devextreme-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../utilities/jwt.interceptor';
import { ErrorInterceptor } from '../utilities/error.interceptor';

@NgModule({
  declarations: [
    ConsoleComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [CommonModule, ConsoleRoutingModule, DxDataGridModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class ConsoleModule {}
