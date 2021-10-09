import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Role} from "../../models/role";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  currenUser: User = new User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currenUser = data;
    });
  }

  isAdmin() {
    return this.currenUser?.role === Role.ADMIN;
  }

  logout() {
      this.authenticationService.logOut();
      this.router.navigate(['/login']);

  }
}
