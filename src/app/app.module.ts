import { NgModule } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from './modules/shared/shared.modules';
import { LoginComponent } from './modules/auth/login/login.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DashboardComponent } from './modules/pages/dashboard/dashboard.component';
import { RegistrationComponent } from './modules/auth/registration/registration.component';
import { AddCustomerComponent } from './modules/pages/customer/add-customer/add-customer.component';
import { AddAppointmentComponent } from './modules/pages/appointment/add-appointment/add-appointment.component';
import { ViewCustomerComponent } from './modules/pages/customer/view-customer/view-customer.component';
import { EditCustomerComponent } from './modules/pages/customer/edit-customer/edit-customer.component';
import { ViewAppointmentComponent } from './modules/pages/appointment/view-appointment/view-appointment.component';

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
