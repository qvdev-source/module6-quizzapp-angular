import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Role} from "../../models/role";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Stomp} from "@stomp/stompjs";
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [NgbModalConfig, NgbModal],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent  {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  currenUser: User = new User;
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';
  message: string = "";

  greetings: string[] = [];
  disabled = true;
  name: string;
  private stompClient: any;
  user: any = null;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              config: NgbModalConfig,
              private modalService: NgbModal,
              private login: AuthenticationService) {
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

  ngOnInit(): void {
    this.user = this.login.getUser();
  }

  logout() {
      this.authenticationService.logOut();
      this.router.navigate(['/login']);

  }
  content:any;
  open(content: any) {
    this.modalService.open(content);
  }



  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket/');
    this.stompClient = Stomp.over(socket);


    const _this = this;
    this.stompClient.connect({}, function (frame: string) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/chat', function (chat: { body: string; }) {
        _this.showGreeting(JSON.parse(chat.body).greeting);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    this.stompClient.send(
      '/gkz/chat',
      {},
      JSON.stringify({ 'name': this.user.name ,'message': this.message})
    );

  }

  showGreeting(message: any) {
    this.greetings.push(message);
  }

}
