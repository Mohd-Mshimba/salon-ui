import { RegistrationComponent } from './modules/auth/registration/registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },{
    path:'registration',
    component:RegistrationComponent
  },{
    path :'resources',
    loadChildren: () => import('./layout/nav-routing.module').then(m=>m.NavRoutingModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
