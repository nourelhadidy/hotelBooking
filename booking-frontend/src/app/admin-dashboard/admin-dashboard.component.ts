/* File: admin-dashboard.component.ts
  Description: This file contains the missing 'updateBooking' and 'deleteBooking' methods.
*/
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users: any[] = [];
  bookings: any[] = [];
  newUser = { name: '', email: '', password: '', phone: '' };

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadBookings();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: any) => {
        // --- FIX STARTS HERE ---
        // Add a log to see what the server is actually sending.
        console.log("Raw response from getUsers:", res);

        // Make the code more robust: check if the response is an array directly,
        // or if it's an object with a 'data' property.
        if (Array.isArray(res)) {
          this.users = res;
        } else if (res && Array.isArray(res.data)) {
          this.users = res.data;
        } else {
          console.warn("Received user data is not in a recognized format.", res);
          this.users = []; // Default to empty array if format is unexpected
        }
        // --- FIX ENDS HERE ---
      },
      error: (err) => {
        console.error('Error loading users', err);
        this.users = [];
      }
    });
  }

  loadBookings() {
    this.adminService.getAllBookings().subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.bookings = data;
        } else {
          this.bookings = [];
        }
      },
      error: (err) => {
        console.error('Error loading bookings.', err);
        this.bookings = [];
      }
    });
  }

  addUser() {
    this.adminService.addUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = { name: '', email: '', password: '', phone: '' };
    });
  }

  editUser(user: any) {
    this.adminService.updateUser(user._id, user).subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(id: string) {
    this.adminService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  /**
   * ✅ Method to save changes to a booking.
   */
  updateBooking(booking: any) {
    this.adminService.updateBooking(booking._id, booking).subscribe({
      next: () => {
        alert('Booking updated successfully!');
        this.loadBookings(); // Refresh the list
      },
      error: (err) => console.error('Error updating booking', err)
    });
  }

  /**
   * ✅ Method to delete a booking.
   */
  deleteBooking(id: string) {
    // In a real app, you should use a custom modal for confirmation, not window.confirm.
    if (confirm('Are you sure you want to delete this booking?')) {
      this.adminService.deleteBooking(id).subscribe({
        next: () => {
          alert('Booking deleted successfully!');
          this.loadBookings(); // Refresh the list
        },
        error: (err) => console.error('Error deleting booking', err)
      });
    }
  }
}
