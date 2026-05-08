import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

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
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
this.profileForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  phoneNumber: [''],
  picture: [''],
  address: [''],
  age: [null]
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
      this.userEmail = response.data.email;
      this.profileForm.patchValue({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNumber: response.data.phoneNumber,
        picture: response.data.picture,
        address: response.data.address,
        age: response.data.age
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
        this.profileSuccess = 'Profile updated successfully!';
        this.profileError = '';
      },
      error: () => {
        this.profileError = 'Failed to update profile!';
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

deleteAccount(): void {
  this.userService.deleteAccount().subscribe({
    next: () => {
      alert('Your account has been deleted.');
      this.authService.logout();
      this.router.navigate(['/register']);
    },
    error: () => {
      alert('Account deletion failed!');
    }
  });
}

showPasswordForm = false;
showDeleteWarning = false;

togglePasswordForm(): void {
  this.showPasswordForm = !this.showPasswordForm;
  this.showDeleteWarning = false;
}

toggleDeleteWarning(): void {
  this.showDeleteWarning = !this.showDeleteWarning;
  this.showPasswordForm = false;
}

userEmail = '';

}

