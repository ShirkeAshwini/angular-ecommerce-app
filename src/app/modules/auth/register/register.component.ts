import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user={
    name:'',
    email:'',
    password:''
  };

  constructor(
    private authService:AuthService,
    private router:Router,
    private toastr: ToastrService 
  ){}



   register(form: any) {
  
    if (form.invalid) {
      this.toastr.error('Please fill all required fields', 'Validation Error');
      return;
    }
  
    this.authService.register(this.user).subscribe({
      next: (res: any) => {
         this.toastr.success('Registration successful', 'Success');
         this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.toastr.error(
        err.error?.message || 'Registration failed',
        'Error'
      );
      }
    });
  }
}



