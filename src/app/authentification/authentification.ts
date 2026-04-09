import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { LoginService } from '../services/login-service';
import { createUserForm, validateUserForm } from '../models/userModel';
import { Router } from '@angular/router';
import { ErrorValdiations } from '../error-valdiations/error-valdiations';

@Component({
  selector: 'app-authentification',
  imports: [FormField, ErrorValdiations],
  templateUrl: './authentification.html',
  styleUrl: './authentification.css',
})
export class Authentification {
  loginService = inject(LoginService);

  router = inject(Router);

  userSignal = createUserForm();
  userForm = form(this.userSignal, (e) => validateUserForm(e));

  showPassword = signal<boolean>(false);

  show = signal<boolean>(false);

  checkEmailExists() {
    this.loginService.checkExistsByEmail(this.userSignal().email).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.showPassword.set(true);
        }
        this.show.set(response.status === 200 && response.body === true);
      },
      error: (error) => {
        this.show.set(false);
      },
    });
  }

  register() {
    this.loginService.createUser(this.userSignal()).subscribe({
      next: (r) => {
        if (r.status === 201) {
          sessionStorage.setItem('userData', this.userSignal().email);
          this.router.navigateByUrl('/appointments');
        }
      },
      error: (error) => {
        console.error('Error creating user:', error);
        alert('Error creating user. Please try again.');
      },
    });
  }

  logIn() {
    this.loginService.logIn(this.userSignal()).subscribe({
      next: (r) => {
        if (r.status === 200 && r.body != null && r.body > 0) {
          sessionStorage.setItem('userData', this.userSignal().email);
          this.router.navigateByUrl('/appointments');
        } else {
          alert('Invalid email or password. Please try again.');
        }
      },
      error: (error) => {
        console.error('Error logging in:', error);
        alert('Error logging in. Please try again.');
      },
    });
  }
}
