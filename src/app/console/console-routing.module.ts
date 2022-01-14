import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsoleComponent } from './console.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'console', pathMatch: 'prefix' },
  {
    path: 'console',
    component: ConsoleComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      { path: 'home', component: HomeComponent },
      {
        path: 'idap',
        loadChildren: () =>
          import('./idap-service/idap-service.module').then(
            (m) => m.IdapServiceModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsoleRoutingModule {}
