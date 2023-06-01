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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    DashboardComponent,
    ViewCustomerComponent,
    RegistrationComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
