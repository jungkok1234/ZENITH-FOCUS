import { Component } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

interface UserAccount {
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  email = '';
  password = '';
  showPassword = false;
  isLoading = false;
  emailError = '';
  passwordError = '';

  // Hardcoded fallback accounts (kept for testing)
  validAccounts = [
    { email: 'yanmark@gmail.com', password: '123456' },
    { email: 'admin', password: 'admin' }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  clearErrors() {
    this.emailError = '';
    this.passwordError = '';
  }

  validate(): boolean {
    let isValid = true;
    this.clearErrors();

    if (!this.email.trim()) {
      this.emailError = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim()) && this.email.trim() !== 'admin') {
      this.emailError = 'Please enter a valid email';
      isValid = false;
    }

    if (!this.password) {
      this.passwordError = 'Password is required';
      isValid = false;
    }

    return isValid;
  }

  // Get registered accounts from localStorage
  private getRegisteredAccounts(): UserAccount[] {
    return JSON.parse(localStorage.getItem('accounts') || '[]');
  }

  // Check if credentials match any registered account
  private findRegisteredAccount(email: string, password: string): UserAccount | undefined {
    const accounts = this.getRegisteredAccounts();
    return accounts.find(
      acc => acc.email.toLowerCase() === email.trim().toLowerCase() && acc.password === password
    );
  }

  // Check hardcoded fallback accounts
  private findHardcodedAccount(email: string, password: string): { email: string; password: string } | undefined {
    return this.validAccounts.find(
      acc => acc.email === email.trim() && acc.password === password
    );
  }

  async login() {
    if (!this.validate()) return;

    this.isLoading = true;

    setTimeout(async () => {
      // Try registered accounts first, then fall back to hardcoded
      const registeredAccount = this.findRegisteredAccount(this.email, this.password);
      const hardcodedAccount = this.findHardcodedAccount(this.email, this.password);

      if (registeredAccount) {
        // Save current user session
        localStorage.setItem('currentUser', JSON.stringify({
          email: registeredAccount.email,
          fullName: registeredAccount.fullName,
          isLoggedIn: true
        }));
        await this.showToast(`Welcome back, ${registeredAccount.fullName}! 👋`, 'success');
        this.router.navigate(['/tabs']);
      } else if (hardcodedAccount) {
        // Save hardcoded user session
        localStorage.setItem('currentUser', JSON.stringify({
          email: hardcodedAccount.email,
          fullName: hardcodedAccount.email,
          isLoggedIn: true
        }));
        await this.showToast('Welcome back! 👋', 'success');
        this.router.navigate(['/tabs']);
      } else {
        this.passwordError = 'Invalid email or password';
        await this.showToast('Login failed. Please try again.', 'danger');
      }

      this.isLoading = false;
    }, 800);
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      message: 'Enter your email to receive reset instructions',
      inputs: [
        {
          name: 'resetEmail',
          type: 'email',
          placeholder: 'your@email.com'
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Send',
          handler: (data) => {
            if (data.resetEmail) {
              this.showToast('Reset link sent! Check your email.', 'success');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  goToCreateAccount() {
    this.router.navigate(['/register']);
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