import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pet } from './../models/Pet';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private url = environment.backendUrl + '/pets';
  constructor(private http: HttpClient) {}

  async create(pet: Pet) {
    const petCreated = await this.http.post(this.url, pet).toPromise();
    return petCreated;
  }

  async list() {
    const pets = await this.http.get(this.url).toPromise();
    return pets;
  }

  async read(id: number) {
    const urlGet = this.url + '/' + id;
    const pet = await this.http.get(urlGet).toPromise();
    return pet;
  }

  async update(id: number, pet: Pet) {
    const petUpdated = await this.http
      .put(this.url + '/' + id, pet)
      .toPromise();
    return petUpdated;
  }

  async delete(id: number) {
    await this.http.delete(this.url + '/' + id).toPromise();
  }
}

/*
  GET - http://localhost:3000/pets -> todos
  GET - http://localhost:3000/pets/{id} -> usuario com esse id
  POST - http://localhost:3000/pets -> passa no body o pet a ser criado
  PATCH / PUT - http://localhost:3000/pets/{id} -> passa no body o pet/dados do pet a ser modificado
  DELETE - http://localhost:3000/pets/{id} -> deletar o usuário com esse id
*/
