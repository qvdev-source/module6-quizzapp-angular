import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  user: User = new User();
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  register() {
    this.authenticationService.MathPassword(this.user.password, this.user.confirmPassword)
    this.authenticationService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Username already exist.';
      } else {
        this.errorMessage = 'Unexpected error occurred. Error is: ' + err?.errorMessage;
        console.log(err);
      }
    })
  }
}
