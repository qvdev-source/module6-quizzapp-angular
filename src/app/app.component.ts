import {Component} from '@angular/core';
import {User} from "./models/user";
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {Role} from "./models/role";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-angular';

  currenUser: User = new User;

  constructor(private authenticationService: AuthenticationService, private router: Router,
              private ngxService: NgxUiLoaderService) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currenUser = data;
    });
  }

  isAdmin() {
    return this.currenUser?.role === Role.ADMIN;
  }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }

}
