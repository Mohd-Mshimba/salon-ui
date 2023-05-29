import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.modules';
import { DashboardComponent } from './modules/pages/dashboard/dashboard.component';
import { ViewCustomerComponent } from './modules/pages/customer/view-customer/view-customer.component';
import { AddCustomerComponent } from './modules/pages/customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './modules/pages/customer/edit-customer/edit-customer.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegistrationComponent } from './modules/auth/registration/registration.component';
import { ViewAppointmentComponent } from './modules/pages/appointment/view-appointment/view-appointment.component';
import { AddAppointmentComponent } from './modules/pages/appointment/add-appointment/add-appointment.component';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    ViewCustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    LoginComponent,
    RegistrationComponent,
    ViewAppointmentComponent,
    AddAppointmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    SharedModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
