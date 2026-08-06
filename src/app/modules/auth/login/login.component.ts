import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
  email: '',
  password: ''
};

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

     login() {
      this.authService.login(this.user).subscribe({
       next: (res: any) => {

  console.log("LOGIN RESPONSE:", res);

  // normalize backend response
  const user = {
    id: res.user.Id,
    name: res.user.Name,
    email: res.user.Email,
    role: res.user.Role?.toLowerCase()   // 👈 IMPORTANT FIX
  };

  this.authService.getUserId()

  this.authService.setUser(res.user);

  localStorage.setItem('user', JSON.stringify(user));

  this.toastr.success(res.message, 'Success');

  // ROUTING LOGIC
  if (user.role === 'admin') {
    this.router.navigate(['/admin/dashboard']);
  } else {
    this.router.navigate(['/products']);
  }
},

    error: (err) => {
      const message =
        err.error?.message || err.message || 'Login failed';

      this.toastr.error(message, 'Login Failed');
    }
  });
}
}