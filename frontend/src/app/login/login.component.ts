import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ResetService } from '../services/reset.service';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private resetService: ResetService,
    private router: Router
  ) { }

  login() {
    const val = this.loginForm.value;

    if (val.email && val.password) {
      const hashedPassword = SHA256(val.password).toString();
      this.authService.login(val.email, hashedPassword)
        .subscribe(
          () => {
            this.router.navigateByUrl('/');
          }
        );
    }
  }

  reset() {
    this.resetService.reset();
  }
}
