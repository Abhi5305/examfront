import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path : '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path : 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path : 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '',
    pathMatch: 'full',
  }, // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
