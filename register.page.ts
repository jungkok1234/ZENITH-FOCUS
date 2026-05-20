import { Component } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

interface UserAccount {
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirm = false;
  isLoading = false;

  nameError = '';
  emailError = '';
  passwordError = '';
  confirmError = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ personOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }

  clearErrors() {
    this.nameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmError = '';
  }

  validate(): boolean {
    let isValid = true;
    this.clearErrors();

    if (!this.fullName.trim()) {
      this.nameError = 'Full name is required';
      isValid = false;
    } else if (this.fullName.trim().length < 2) {
      this.nameError = 'Name must be at least 2 characters';
      isValid = false;
    }

    if (!this.email.trim()) {
      this.emailError = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim())) {
      this.emailError = 'Please enter a valid email';
      isValid = false;
    }

    if (!this.password) {
      this.passwordError = 'Password is required';
      isValid = false;
    } else if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!this.confirmPassword) {
      this.confirmError = 'Please confirm your password';
      isValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.confirmError = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  private emailExists(email: string): boolean {
    const accounts: UserAccount[] = JSON.parse(localStorage.getItem('accounts') || '[]');
    return accounts.some(acc => acc.email.toLowerCase() === email.toLowerCase());
  }

  private saveAccount(account: UserAccount): void {
    const accounts: UserAccount[] = JSON.parse(localStorage.getItem('accounts') || '[]');
    accounts.push(account);
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }

  async register() {
    if (!this.validate()) return;

    if (this.emailExists(this.email)) {
      this.emailError = 'An account with this email already exists';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const newAccount: UserAccount = {
        fullName: this.fullName.trim(),
        email: this.email.trim().toLowerCase(),
        password: this.password,
        createdAt: new Date().toISOString()
      };

      this.saveAccount(newAccount);
      this.showToast('Account created successfully! 🎉', 'success');
      this.router.navigate(['/login']);
      this.isLoading = false;
    }, 1000);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async showToast(message: string, color: 'success' | 'danger' | 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      buttons: [{ icon: 'close', role: 'cancel' }]
    });
    await toast.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}