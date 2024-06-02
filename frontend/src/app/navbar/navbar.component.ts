// navbar.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { navbarData } from './nav-data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() username = '';
  @Input() userPic = '';
  @Input() isLoggedIn = false;
  navData = navbarData;
  user:any;
  isAdmin = false;

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.username);
    this.user = this.storageService.getUser();
    if(this.user.roles == 'ROLE_ADMIN'){
      this.isAdmin = true;
    }
  }

  signOut(): void {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
