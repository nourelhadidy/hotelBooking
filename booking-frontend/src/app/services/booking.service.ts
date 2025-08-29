import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- Interfaces ---

export interface Room {
  userId: string; // ✅ Add this required property
    type: string;
    description: string;
    pricePerNight: number;
    nights?: number;
    totalPrice?: number;
}

export interface AvailableRoomsResponse {
    availableRooms: Room[];
}

// This interface is now optional as the component can create the object directly.
export interface BookingData {
    roomId: string;
    checkIn: string;
    checkOut: string;
    price: number;
    paymobOrderId?: string;
}

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private baseUrl = 'http://localhost:5000/api';

    constructor(private http: HttpClient) { }

    // --- MODIFICATION START ---
    /**
     * Creates the authorization headers by getting the token from localStorage.
     * This is crucial for communicating with your secure backend routes.
     */
    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token'); // Assumes the token is stored after login
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }
    // --- MODIFICATION END ---

    getAvailableRooms(checkIn: string, checkOut: string, guests: number): Observable<AvailableRoomsResponse> {
        const params = { checkIn, checkOut, guests: guests.toString() };
        return this.http.get<AvailableRoomsResponse>(`${this.baseUrl}/rooms/available`, { params });
    }

    /**
     * Creates a booking. Now sends the authentication token in the headers.
     */
    createBooking(bookingData: BookingData): Observable<any> {
        // ✅ Now includes the Authorization header.
        return this.http.post(`${this.baseUrl}/bookings`, bookingData, { headers: this.getAuthHeaders() });
    }

    getAllBookings(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/bookings`, { headers: this.getAuthHeaders() });
    }

    getUserBookings(): Observable<any> {
        // ✅ Now includes the Authorization header.
        return this.http.get(`${this.baseUrl}/user`, { headers: this.getAuthHeaders() });
    }

    createPaymentSession(room: any): Observable<{ paymentToken: string, orderId: string }> {
        return this.http.post<{ paymentToken: string, orderId: string }>(`${this.baseUrl}/payments/create-session`, { room }, { headers: this.getAuthHeaders() });
    }

    verifyPayment(paymobOrderId: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/bookings/verify-payment`, { paymobOrderId }, { headers: this.getAuthHeaders() });
    }
}
