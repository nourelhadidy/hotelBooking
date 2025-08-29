import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:5000/api/dashboard'; 

    constructor(private http: HttpClient) { }

    // Fetch user info (name, email, bookings, etc.)
    getUserInfo(userId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${userId}`);
    }
}
