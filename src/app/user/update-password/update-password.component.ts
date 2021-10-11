import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChangePasswordService} from "../../services/change-password.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  currenUser: User = new User;

  userChangePassword = {
    username: '',
    oldPassword: '',
    newPassword: ''
  }

  constructor(private authenticationService: AuthenticationService, private router: Router,
              private ngxService: NgxUiLoaderService,
              private snack: MatSnackBar,
              private changePasswordService: ChangePasswordService) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currenUser = data;
    });
  }

  ngOnInit(): void {
    console.log(this.currenUser.username)
  }

  changePassword() {
    this.userChangePassword.username = this.currenUser.username;
    console.log(this.userChangePassword);
    if (this.userChangePassword.oldPassword.trim() == '' || this.userChangePassword.oldPassword == null) {
      this.snack.open('OldPassword Required !!', '', {
        duration: 3000,
      });
      return;
    }

    if (this.userChangePassword.newPassword.trim() == '' || this.userChangePassword.newPassword == null) {
      this.snack.open('NewPassword Required !!', '', {
        duration: 3000,
      });
      return;
    }

    // @ts-ignore
    this.changePasswordService.changePassword(this.userChangePassword).subscribe(data => {
      Swal.fire('Success', 'Password change', 'success');
      // @ts-ignore
      this.userChangePassword = {
        username: '',
        oldPassword: '',
        newPassword: ''
      };
      this.logOut();

    }, error => {
      Swal.fire('Error', 'OldPassword not match !!', 'error');
      console.log(error)
    })
  }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }

}
