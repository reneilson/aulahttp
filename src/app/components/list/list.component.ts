import { Component, OnInit } from '@angular/core';
import { User } from './../../models/User';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users?: Array<User>;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.users = (await this.userService.list()) as any;
  }

  async remover(user: User) {
    const index = this.users!.findIndex((u) => user.id == u.id);
    this.users!.splice(index, 1);
  }
}
