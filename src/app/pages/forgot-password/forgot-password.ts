import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) return;

    this.isLoading = true;
    const email = this.forgotForm.value.email;

    this.http.post(`https://restaurantapi.stepacademy.ge/api/auth/forgot-password/${email}`, {}).subscribe({
      next: () => {
        this.successMessage = 'Şifre sıfırlama kodu emailinize gönderildi!';
        this.errorMessage = '';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/reset-password']), 2000);
      },
      error: () => {
        this.errorMessage = 'Email bulunamadı!';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }
}