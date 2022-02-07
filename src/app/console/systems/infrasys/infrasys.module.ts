import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfrasysComponent } from './infrasys.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DxDataGridModule } from 'devextreme-angular';
import { NgxLoadingModule } from 'ngx-loading';
import { ConsoleModule } from '../../console.module';
import { InfrasysRoutingModule } from './infrasys-routing.module';

@NgModule({
  declarations: [InfrasysComponent],
  imports: [
    CommonModule,
    InfrasysRoutingModule,
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
})
export class InfrasysModule {}
