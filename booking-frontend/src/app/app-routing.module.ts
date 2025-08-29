import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentCallbackComponent } from './payment-callback/payment-callback.component';
import { SpaComponent } from './spa/spa.component';
import { DiningComponent } from './dining/dining.component';
import { SupportComponent } from './support/support.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'booking/:roomId', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'payment-callback', component: PaymentCallbackComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // ✅ New public pages
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'spa', component: SpaComponent },
  { path: 'dining', component: DiningComponent },
  { path: 'support', component: SupportComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // 👈 Always go to top on navigation
      anchorScrolling: 'enabled',          // 👈 Allow #anchors to scroll
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
