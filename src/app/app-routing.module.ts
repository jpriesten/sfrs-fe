import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { NotAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./console/console.module').then((m) => m.ConsoleModule),
  },
  {
    path: 'login',
    canActivate: [NotAuthGuard],
    component: LoginComponent,
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
