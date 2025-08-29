// src/app/guards/public.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PublicGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
        const token = localStorage.getItem('token');

        if (token) {
            // User is logged in, so redirect them away from login/register page.
            this.router.navigate(['/']); // Redirect to home page
            return false; // ❌ Deny access to the public page
        } else {
            // User is not logged in, so allow them to access login/register.
            return true; // ✅ Grant access
        }
    }
}
