import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const token = this.authService.getStoredToken();
    if (token && this.authService.isLogged()) {
      this.router.navigate(['']);
    }
  }

  async login() {
    const newTokenRequest: any = {
      username: this.username,
      password: this.password,
    };
    await this.authService.createToken(newTokenRequest);
    await this.authService.getUser();
    this.router.navigate(['']);
  }
}
