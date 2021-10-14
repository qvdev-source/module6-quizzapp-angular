import {Component, OnInit} from '@angular/core';
import {Stomp} from "@stomp/stompjs";
import {AuthenticationService} from "../../services/authentication.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],


})
export class ChatComponent implements OnInit {
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';
  message: string = "";

  greetings: string[] = [];
  disabled = true;
  name: string;
  private stompClient: any;
  user: any = null;



  constructor(private login: AuthenticationService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
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
