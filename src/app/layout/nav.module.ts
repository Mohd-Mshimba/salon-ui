import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { NavRoutingModule } from "./nav-routing.module";
import { SharedModule } from '../modules/shared/shared.modules';
import { DialogFromMenuDialogComponent } from './dialog-from-menu-dialog/dialog-from-menu-dialog.component';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    DialogFromMenuDialogComponent
  ],
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
