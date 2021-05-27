import { Injectable } from '@angular/core';
import { Client } from './../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor() {}

  async create(client: Client) {}

  async list() {}

  async read(id: number) {}

  async update(id: number) {}

  async delete(id: number) {}
}
