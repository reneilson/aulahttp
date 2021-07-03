import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from './../../models/Pet';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() pet!: Pet;
  @Output() readonly emitRemove = new EventEmitter<Pet>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  emit() {
    this.emitRemove.emit(this.pet);
  }

  open() {
    this.router.navigate(['pets/register', this.pet.id]);
  }
}
