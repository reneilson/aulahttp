import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      if (params.id) {
        // this.user = await this.userService.get(params.id);
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
    this.user = {} as any;
    this.user!.name = this.form.value.nameControl;
    this.user!.email = this.form.value.emailControl;
    this.user!.password = this.form.value.passControl;
    this.user!.photo = this.form.value.photoControl;
    this.user!.age = this.form.value.ageControl;
    this.user!.latitude = this.form.value.latControl;
    this.user!.longitude = this.form.value.longControl;
    this.user!.eyeColor = this.form.value.colorControl;
  }

  async send() {
    this.getUserFromForm();
    await this.userService.create(this.user!);
    this.router.navigate(['']);
  }

  back() {
    this.router.navigate(['']);
  }
}
