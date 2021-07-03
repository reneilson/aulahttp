import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from './../../models/Pet';
import { PetService } from './../../services/pet.service';

@Component({
  selector: 'app-pet-register',
  templateUrl: './pet-register.component.html',
  styleUrls: ['./pet-register.component.scss'],
})
export class PetRegisterComponent implements OnInit {
  pet?: Pet;
  showLoading = false;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    photoUrl: new FormControl('', [Validators.required]),
    category: new FormControl(),
    tags: new FormControl(),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      if (params.id) {
        this.pet = (await this.petService.read(params.id)) as any;
        this.updateForm();
      }
    });
  }

  updateForm() {
    this.form.setValue({
      name: this.pet!.name,
      photoUrl: this.pet!.photoUrl,
      category: this.pet!.category,
      tags: this.pet!.tags,
    });
  }

  eraseForm() {
    this.form.setValue({
      name: '',
      photoUrl: '',
      category: null,
      tags: null,
    });
  }

  getPetFromForm() {
    if (!this.pet) this.pet = {} as Pet;
    this.pet!.name = this.form.value.name;
    this.pet!.photoUrl = this.form.value.photoUrl;
    this.pet!.category = this.form.value.category;
    this.pet!.tags = this.form.value.tags;
  }

  private async update() {
    try {
      await this.petService.update(this.pet!.id!, this.pet!);
      this.snackBar.open('Pet atualizado com sucesso!', 'x', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'success',
        duration: 500,
      });
      this.router.navigate(['']);
    } catch (error) {
      this.snackBar.open('Não foi possível atualizar o pet', 'x', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'warn',
        duration: 500,
      });
      throw error;
    }
  }

  private async create() {
    try {
      await this.petService.create(this.pet!);
      this.snackBar.open('Pet criado com sucesso!', undefined, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'success',
        duration: 500,
      });
      this.router.navigate(['']);
    } catch (error) {
      this.snackBar.open('Não foi possível atualizar o pet', undefined, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'warn',
        duration: 500,
      });
      throw error;
    }
  }

  async send() {
    try {
      this.getPetFromForm();
      if (this.pet!.id) {
        this.update();
      } else {
        this.create();
      }
    } finally {
      this.showLoading = false;
    }
  }

  back() {
    this.router.navigate(['']);
  }
}
