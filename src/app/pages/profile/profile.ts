import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  isLoading = false;
  profileSuccess = '';
  profileError = '';
  passwordSuccess = '';
  passwordError = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

this.passwordForm = this.fb.group({
  oldPassword: ['', Validators.required],
  newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)]],
  confirmPassword: ['', Validators.required]
});
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.userService.getProfile().subscribe({
      next: (response: any) => {
        this.profileForm.patchValue({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onProfileSubmit(): void {
    if (this.profileForm.invalid) return;

    this.userService.editProfile(this.profileForm.value).subscribe({
      next: () => {
        this.profileSuccess = 'Profil başarıyla güncellendi!';
        this.profileError = '';
      },
      error: () => {
        this.profileError = 'Güncelleme başarısız!';
        this.profileSuccess = '';
      }
    });
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.invalid) return;

    this.userService.changePassword(this.passwordForm.value).subscribe({
      next: () => {
        this.passwordSuccess = 'Şifre başarıyla değiştirildi!';
        this.passwordError = '';
        this.passwordForm.reset();
      },
      error: () => {
        this.passwordError = 'Şifre değiştirme başarısız!';
        this.passwordSuccess = '';
      }
    });
  }
}