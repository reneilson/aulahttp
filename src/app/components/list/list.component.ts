import { Component, OnInit } from '@angular/core';
import { Pet } from './../../models/Pet';
import { PetService } from './../../services/pet.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  pets?: Array<Pet>;
  isLoading = true;

  constructor(private petService: PetService) {}

  async ngOnInit() {
    try {
      this.pets = (await this.petService.list()) as any;
    } finally {
      this.isLoading = false;
    }
  }

  async remover(pet: Pet) {
    const index = this.pets!.findIndex((p) => pet.id == p.id);
    this.pets!.splice(index, 1);
    await this.petService.delete(pet.id!);
  }
}
