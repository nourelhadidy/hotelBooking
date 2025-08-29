import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; // ✅ correct path

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { NavComponent } from './components/nav/nav.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
// import { PaymentSuccessComponent } from './payment-success/payment-success.component';
// import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentCallbackComponent } from './payment-callback/payment-callback.component';
import { SpaComponent } from './spa/spa.component';
import { DiningComponent } from './dining/dining.component';
import { SupportComponent } from './support/support.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { FakePaymentComponent } from './fakepayment/fakepayment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    RegisterComponent,
    HomeComponent,
    BookingComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    // PaymentSuccessComponent,
    // PaymentCancelComponent,
    PaymentComponent,
    PaymentCallbackComponent,
    SpaComponent,
    DiningComponent,
    SupportComponent,
    DashboardComponent,
    // FakePaymentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
