import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Role} from "../../models/role";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class SidebarComponent  {
  currenUser: User = new User;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              config: NgbModalConfig,
              private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.authenticationService.currentUser.subscribe(data => {
      this.currenUser = data;
    });
  }

  isAdmin() {
    return this.currenUser?.role === Role.ADMIN;
  }

  isSuperAdmin() {
    return this.currenUser?.role === Role.SUPER_ADMIN;
  }

  logout() {
      this.authenticationService.logOut();
      this.router.navigate(['/login']);

  }
  content:any;
  open(content: any) {
    this.modalService.open(content);
  }
}
