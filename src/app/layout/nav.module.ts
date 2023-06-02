import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { NavRoutingModule } from "./nav-routing.module";
import { SharedModule } from '../modules/shared/shared.modules';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  // other metadata and declarations
})
@NgModule({
    declarations:[

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
