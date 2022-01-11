import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsoleComponent } from './console.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: ConsoleComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      { path: 'home', component: HomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsoleRoutingModule {}
