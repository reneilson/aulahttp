import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async create(user: User) {
    return this.http.post(`${environment.backendUrl}/users`, user).toPromise();
  }

  async list() {
    const users = await this.http
      .get(environment.backendUrl + '/users')
      .toPromise();
    return users;
  }

  async read(id: number) {}

  async update(id: number) {}

  async delete(id: number) {}
}
