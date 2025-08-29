import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    console.log('Logging in with', this.email, this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log('Login response', res);

        // ✅ Save token & role
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isAdmin', res.data.user.role === 'admin' ? 'true' : 'false');

        alert('✅ Login successful!');

        // ✅ Redirect based on role
        if (res.data.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']); // after login go to home
        }
      },
      error: (err) => {
        console.error('Login error', err);
        alert(err.error?.error || 'Login failed');
      }
    });
  }
}
