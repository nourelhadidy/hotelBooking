// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
        // Check if a token exists. This confirms the user is logged in.
        const token = localStorage.getItem('token');

        if (token) {
            return true; // ✅ Access granted: User is logged in.
        } else {
            // No token found, redirect to the login page.
            this.router.navigate(['/login']);
            return false; // ❌ Access denied: User is not logged in.
        }
    }
}
