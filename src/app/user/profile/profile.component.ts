import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {HttpClient} from "@angular/common/http";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = null;

  constructor(private login: AuthenticationService,
              private http: HttpClient) { }

  ngOnInit(): void {

    this.getUser();
  }
  getUser() {
    this.user = this.login.getUser();
  }

}
