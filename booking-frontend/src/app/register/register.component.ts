import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (res: any) => {
        alert('✅ Registration successful! You will be redirected to the login page.');
        this.router.navigate(['/login']); // Redirect to login page after successful registration
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert(err.error?.error || 'Registration failed');
      }
    });
  }
}


