import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { PetRegisterComponent } from './components/pet-register/pet-register.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'pets/register/:id',
        component: PetRegisterComponent,
      },
      {
        path: 'pets/register',
        component: PetRegisterComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: UserRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
