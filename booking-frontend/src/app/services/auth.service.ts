import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  // A subject to hold and broadcast the login status.
  private loginStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loginStatus$ = this.loginStatusSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Logs a user in, saves their token, and broadcasts the new login status.
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        if (res && res.data && res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('isAdmin', res.data.user.role === 'admin' ? 'true' : 'false');
          this.loginStatusSubject.next(true); // Broadcast that a user has logged in
        }
      })
    );
  }

  /**
   * Registers a new user.
   */
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, {
      name,
      email,
      password
    });
  }

  /**
   * Logs the current user out, clears their token, and broadcasts the new status.
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.loginStatusSubject.next(false); // Broadcast that the user has logged out
  }

  /**
   * Fetches the current user's profile information from the server.
   * Assumes the backend uses the token to identify the user.
   */
  getUser(): Observable<any> {
    // This will be a protected route on the backend, requiring a valid token.
    return this.http.get(`${this.baseUrl}/user`);
  }

  /**
   * Checks if a token exists in local storage on initial load.
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Decodes the JWT from local storage to get the logged-in user's ID.
   */
  getLoggedInUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        // Assumes your token's payload has an 'id' property
        return decodedToken.id || null;
      } catch (error) {
        console.error("Error decoding token", error);
        return null;
      }
    }
    return null;
  }
}

