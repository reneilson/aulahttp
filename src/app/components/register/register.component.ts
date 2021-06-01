import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../models/User';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user?: User;
  showLoading = false;
  form = new FormGroup({
    idControl: new FormControl({ value: '', disabled: true }),
    nameControl: new FormControl(),
    emailControl: new FormControl(),
    passControl: new FormControl(),
    photoControl: new FormControl(),
    ageControl: new FormControl(),
    colorControl: new FormControl(),
    latControl: new FormControl(),
    longControl: new FormControl(),
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
      idControl: this.user!.id,
      nameControl: this.user!.name,
      emailControl: this.user!.email,
      passControl: this.user!.password,
      photoControl: this.user!.photo,
      ageControl: this.user!.age,
      colorControl: this.user!.eyeColor,
      latControl: this.user!.latitude,
      longControl: this.user!.longitude,
    });
  }

  eraseForm() {
    this.form.setValue({
      idControl: '',
      nameControl: '',
      emailControl: '',
      passControl: '',
      photoControl: '',
      ageControl: '',
      colorControl: '',
      latControl: '',
      longControl: '',
    });
  }

  getUserFromForm() {
    this.user!.name = this.form.value.nameControl;
    this.user!.email = this.form.value.emailControl;
    this.user!.password = this.form.value.passControl;
    this.user!.photo = this.form.value.photoControl;
    this.user!.age = this.form.value.ageControl;
    this.user!.latitude = this.form.value.latControl;
    this.user!.longitude = this.form.value.longControl;
    this.user!.eyeColor = this.form.value.colorControl;
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
      this.showLoading = true;
      if (this.user!.id) {
        this.update();
      } else {
        this.create();
      }
      // this.router.navigate(['']);
    } finally {
      this.showLoading = false;
    }
  }

  back() {
    this.router.navigate(['']);
  }
}
