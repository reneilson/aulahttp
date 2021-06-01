import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.backendUrl + '/objetos';
  constructor(private http: HttpClient) {}

  async create(user: User) {
    const userCreated = await this.http.post(this.url, user).toPromise();
    return userCreated;
  }

  async list() {
    const users = await this.http.get(this.url).toPromise();
    return users;
  }

  async read(id: number) {
    const user = await this.http.get(this.url + '/' + id).toPromise();
    return user;
  }

  async update(id: number, user: User) {
    const userUpdated = await this.http
      .patch(this.url + '/' + id, user)
      .toPromise();
    return userUpdated;
  }

  async delete(id: number) {
    await this.http.delete(this.url + '/' + id).toPromise();
  }
}

/*
  GET - http://localhost:3000/users -> todos
  GET - http://localhost:3000/users/{id} -> usuario com esse id
  POST - http://localhost:3000/users -> passa no body o user a ser criado
  PATCH / PUT - http://localhost:3000/users/{id} -> passa no body o user/dados do user a ser modificado
  DELETE - http://localhost:3000/users/{id} -> deletar o usuário com esse id
*/
