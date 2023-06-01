import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { NavRoutingModule } from "./nav-routing.module";
import { ViewAppointmentComponent } from "../modules/pages/appointment/view-appointment/view-appointment.component";
import { AddCustomerComponent } from "../modules/pages/customer/add-customer/add-customer.component";
import { EditCustomerComponent } from '../modules/pages/customer/edit-customer/edit-customer.component';
import { AddAppointmentComponent } from '../modules/pages/appointment/add-appointment/add-appointment.component';
import { SharedModule } from '../modules/shared/shared.modules';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  // other metadata and declarations
})
@NgModule({
    declarations:[
      ViewAppointmentComponent,
      AddAppointmentComponent,
      AddCustomerComponent,
      EditCustomerComponent,
    ],
    imports:[
        CommonModule,
        SharedModule,
        NavRoutingModule,
    ],exports:[
      SharedModule
    ]
})

export class NavModule{}
