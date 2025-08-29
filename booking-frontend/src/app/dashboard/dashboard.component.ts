import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: any = null;
  bookings: any[] = [];
  activeTab: string = 'overview'; // default tab

  private authSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.loginStatus$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.fetchDashboardData();
      } else {
        this.user = null;
        this.bookings = [];
      }
    });
  }

  fetchDashboardData(): void {
    const userId = this.authService.getLoggedInUserId();
    if (userId) {
      this.userService.getUserInfo(userId).subscribe({
        next: (data) => {
          this.user = data.user;
          this.bookings = data.bookings;
        },
        error: (err) => {
          console.error("Error fetching user info", err);
          this.bookings = [];
        }
      });
    }
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
