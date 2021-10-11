import { Component, OnInit } from '@angular/core';
import {Stomp} from "@stomp/stompjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';
  greetings: string[] = [];
  disabled = true;
  name: string;
  message: string = "";

  private stompClient: any;

  constructor() { }

  ngOnInit(): void {
  }
  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/chat', function (chat: any) {
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
      // Dữ liệu được gửi đi
      JSON.stringify({'name': this.name, 'message': this.message})
    );
  }

  showGreeting(message: any) {
    this.greetings.push(message);
  }
}
