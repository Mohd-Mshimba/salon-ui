import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './modules/shared/shared.modules';
import { LoginComponent } from './modules/auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DashboardComponent } from './modules/pages/dashboard/dashboard.component';
import { RegistrationComponent } from './modules/auth/registration/registration.component';
import { ViewCustomerComponent } from './modules/pages/customer/view-customer/view-customer.component';
import { ViewAppointmentComponent } from './modules/pages/appointment/view-appointment/view-appointment.component';
import { AddAppointmentComponent } from './modules/pages/appointment/add-appointment/add-appointment.component';
import { AddCustomerComponent } from './modules/pages/customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './modules/pages/customer/edit-customer/edit-customer.component';
import { EditAppointmentComponent } from './modules/pages/appointment/edit-appointment/edit-appointment.component';
import { AddUserComponent } from './modules/pages/users/add-user/add-user.component';
import { EditUserComponent } from './modules/pages/users/edit-user/edit-user.component';
import { ViewUserComponent } from './modules/pages/users/view-user/view-user.component';
import { AddRoleComponent } from './modules/pages/roles/add-role/add-role.component';
import { EditRoleComponent } from './modules/pages/roles/edit-role/edit-role.component';
import { ViewRoleComponent } from './modules/pages/roles/view-role/view-role.component';
import { AddDocumentComponent } from './modules/pages/documents/add-document/add-document.component';
import { EditDocumentComponent } from './modules/pages/documents/edit-document/edit-document.component';
import { ViewDocumentComponent } from './modules/pages/documents/view-document/view-document.component';
import { PreviewDocumentComponent } from './modules/pages/documents/preview-document/preview-document.component';
import { SafeHtmlPipe } from './modules/shared/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    DashboardComponent,
    ViewCustomerComponent,
    RegistrationComponent,
    ViewAppointmentComponent,
    AddAppointmentComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    EditAppointmentComponent,
    AddUserComponent,
    EditUserComponent,
    ViewUserComponent,
    AddRoleComponent,
    EditRoleComponent,
    SafeHtmlPipe,
    ViewRoleComponent,
    AddDocumentComponent,
    EditDocumentComponent,
    ViewDocumentComponent,
    PreviewDocumentComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    SafeHtmlPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
