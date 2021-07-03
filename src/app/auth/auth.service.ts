import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Token } from './../models/Token';
import { User } from './../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  urls = {
    token: `${environment.backendUrl}/authenticate`,
  };

  async createToken(request: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const token = (await this.http
      .post(this.urls.token, request, httpOptions)
      .toPromise()) as Token;
    this.storeToken(token);

    return token;
  }

  async isLogged() {
    try {
      if (!this.getStoredToken()) return false;
      await this.http.get(`${environment.backendUrl}/pets`).toPromise();
      return true;
    } catch {
      return false;
    }
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    try {
      const str = localStorage.getItem('user');
      if (!str) return {} as User;
      return JSON.parse(str) as User;
    } catch (err) {
      return {} as User;
    }
  }

  getStoredToken() {
    try {
      const str = localStorage.getItem('token');
      if (!str) return undefined;
      return JSON.parse(str) as Token;
    } catch (err) {
      return undefined;
    }
  }

  storeToken(response: Token) {
    localStorage.setItem('token', JSON.stringify(response));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
