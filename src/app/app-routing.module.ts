import { RegistrationComponent } from './modules/auth/registration/registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DashboardComponent } from './modules/pages/dashboard/dashboard.component';
import { ViewCustomerComponent } from './modules/pages/customer/view-customer/view-customer.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ViewAppointmentComponent } from './modules/pages/appointment/view-appointment/view-appointment.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },{
    path:'registration',
    component:RegistrationComponent
  },{
    path:'',
    component:NavigationComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },{
        path:'customer',
        component:ViewCustomerComponent
      },{
        path:'appointment',
        component:ViewAppointmentComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
