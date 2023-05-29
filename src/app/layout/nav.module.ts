import { ViewCustomerComponent } from './../modules/pages/customer/view-customer/view-customer.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NavRoutingModule } from "./nav-routing.module";
import { ViewAppointmentComponent } from "../modules/pages/appointment/view-appointment/view-appointment.component";
import { AddCustomerComponent } from "../modules/pages/customer/add-customer/add-customer.component";
import { EditCustomerComponent } from '../modules/pages/customer/edit-customer/edit-customer.component';
import { AddAppointmentComponent } from '../modules/pages/appointment/add-appointment/add-appointment.component';
import { SharedModule } from '../modules/shared/shared.modules';


@NgModule({
    declarations:[
      ViewAppointmentComponent,
      AddAppointmentComponent,
      AddCustomerComponent,
      ViewCustomerComponent,
      EditCustomerComponent,
    ],
    imports:[
        CommonModule,
        SharedModule,
        NavRoutingModule,
    ]
})

export class NavModule{}
