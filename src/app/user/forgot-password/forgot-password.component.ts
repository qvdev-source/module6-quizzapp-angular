import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ResetpasswordService} from "../../services/resetpassword.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  hide = true;
  emailUser = {
    email:'',
    username:''
  }

  constructor(private resetPasswordService: ResetpasswordService) { }

  ngOnInit(): void {
  }

  resetPassword() {
    console.log(this.emailUser);
    this.resetPasswordService.resetPassword(this.emailUser).subscribe(
      ()=>{
        Swal.fire('Success','Email sent with your new password , please check your email','success')
      },error => {
        Swal.fire('error','Username not found or email not found , try again later !','error')
      }
    )
  }
}
