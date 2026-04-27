import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss'
})
export class VerifyEmailComponent {
  verifyForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.verifyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.verifyForm.invalid) return;

    this.isLoading = true;
    this.authService.verifyEmail(this.verifyForm.value).subscribe({
      next: () => {
        this.successMessage = 'Email başarıyla doğrulandı!';
        this.errorMessage = '';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.errorMessage = 'Doğrulama kodu hatalı!';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }
}