/* File: admin.service.ts
  Description: I've added 'updateBooking' and 'deleteBooking' methods.
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private userApiUrl = 'http://localhost:5000/api/admin/users';
  private bookingApiUrl = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    return { Authorization: `Bearer ${token}` };
  }

  // --- User Methods ---
  getUsers(): Observable<any> {
    return this.http.get(this.userApiUrl, { headers: this.getAuthHeaders() });
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.userApiUrl, user, { headers: this.getAuthHeaders() });
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.userApiUrl}/${id}`, user, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.userApiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // --- Booking Methods ---
  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.bookingApiUrl, { headers: this.getAuthHeaders() });
  }

  /**
   * ✅ New method to update a booking by its ID.
   * Your backend will need a PUT route at /api/bookings/:id
   */
  updateBooking(id: string, bookingData: any): Observable<any> {
    return this.http.put(`${this.bookingApiUrl}/${id}`, bookingData, { headers: this.getAuthHeaders() });
  }

  /**
   * ✅ New method to delete a booking by its ID.
   * Your backend will need a DELETE route at /api/bookings/:id
   */
  deleteBooking(id: string): Observable<any> {
    return this.http.delete(`${this.bookingApiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
