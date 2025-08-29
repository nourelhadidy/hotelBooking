// src/app/guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
        // Check if the user has the 'admin' role.
        const isAdmin = localStorage.getItem('isAdmin');

        if (isAdmin === 'true') {
            return true; // ✅ Access granted: User is an admin.
        } else {
            // User is not an admin, show an error and redirect to their home page.
            alert('Access denied: This page is for admins only.');
            this.router.navigate(['/']); // Redirect non-admins to the user home page
            return false; // ❌ Access denied: User is not an admin.
        }
    }
}
