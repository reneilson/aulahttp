import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../models/User';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  user?: User;
  showLoading = false;
  form = new FormGroup({
    emailControl: new FormControl('', [Validators.required]),
    passControl: new FormControl('', [Validators.required]),
    usernameControl: new FormControl('', [Validators.required]),
    nameControl: new FormControl(),
    lastnameControl: new FormControl(),
    phoneControl: new FormControl(),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      if (params.id) {
        this.user = (await this.userService.read(params.id)) as any;
        this.updateForm();
      }
    });
  }

  updateForm() {
    this.form.setValue({
      emailControl: this.user!.email,
      passControl: this.user!.password,
      usernameControl: this.user!.username,
      nameControl: this.user!.name,
      lastnameControl: this.user!.lastname,
      phoneControl: this.user!.phone,
    });
  }

  eraseForm() {
    this.form.setValue({
      emailControl: '',
      passControl: '',
      usernameControl: '',
      nameControl: '',
      lastnameControl: '',
      phoneControl: '',
    });
  }

  getUserFromForm() {
    if (!this.user) this.user = {} as User;
    this.user!.name = this.form.value.nameControl;
    this.user!.email = this.form.value.emailControl;
    this.user!.password = this.form.value.passControl;
    this.user!.username = this.form.value.usernameControl;
    this.user!.lastname = this.form.value.lastnameControl;
    this.user!.phone = this.form.value.phoneControl;
  }

  private async update() {
    try {
      await this.userService.update(this.user!.id!, this.user!);
      this.snackBar.open('Usuário atualizado com sucesso!', 'x', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'success',
      });
    } catch (error) {
      this.snackBar.open('Não foi possível atualizar o usuário', 'x', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'warn',
      });
      throw error;
    }
  }

  private async create() {
    try {
      await this.userService.create(this.user!);
      this.snackBar.open('Usuário criado com sucesso!', undefined, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'success',
      });
    } catch (error) {
      this.snackBar.open('Não foi possível atualizar o usuário', undefined, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'warn',
      });
      throw error;
    }
  }

  async send() {
    try {
      this.getUserFromForm();
      if (this.user!.id) {
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
