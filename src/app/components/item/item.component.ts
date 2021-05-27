import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../models/User';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() user!: User;
  @Output() readonly emitRemove = new EventEmitter<User>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  emit() {
    this.emitRemove.emit(this.user);
  }

  open() {
    this.router.navigate(['users', this.user.id]);
  }
}
