import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavigationComponent } from "./navigation/navigation.component";
import { ViewCustomerComponent } from "../modules/pages/customer/view-customer/view-customer.component";
import { ViewAppointmentComponent } from "../modules/pages/appointment/view-appointment/view-appointment.component";
import { DashboardComponent } from "../modules/pages/dashboard/dashboard.component";

const routes: Routes = [
  {
    path:'',
    component:NavigationComponent,
    children:[
      {
        path:'',
        component:DashboardComponent
      },{
        path:'customer',
        component:ViewCustomerComponent
      },{
        path:'appointment',
        component:ViewAppointmentComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }


