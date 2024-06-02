import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          transform: 'translateY(-10%)',
          opacity: 0,
        })
      ),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in')),
    ]),
  ],
})
export class SettingsComponent {
  user: any;
  usernameForm: { [key: string]: string } = {
    username: null,
    email: null,
    password: null,
  };
  passwordForm: { [key: string]: string } = {
    oldPass: null,
    password: null,
    confirmPassword: null,
  };
  deletePassword: string;
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.storageService.getUser();
    console.log(this.user.roles);
    if (this.user.roles == null) {
      this.router.navigate(['login']);
    }
  }

  changeUsername(): void {
    console.log(this.usernameForm['username']);
    this.authService
      .updateusername(
        this.usernameForm['username'],
        this.usernameForm['email'],
        this.usernameForm['password']
      )
      .subscribe((response) => {
        this.storageService.saveUser(response);
        window.location.reload();
      });
  }

  changePassword(): void {
    this.authService
      .updateusername(
        this.passwordForm['oldPass'],
        this.passwordForm['password'],
        this.passwordForm['confirmPassword']
      )
      .subscribe((response) => {
        this.storageService.saveUser(response);
        window.location.reload();
      });
  }
}
