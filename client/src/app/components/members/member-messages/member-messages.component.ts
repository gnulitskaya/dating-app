import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.scss'
})
export class MemberMessagesComponent implements OnInit {
  @Input() username: string = '';
  @Input() messages: Message[] = [];
  loading: boolean = false;

  messagesForm: FormGroup = new FormGroup({
    messageContent: new FormControl(null, [
      Validators.required,
    ]),
  });

  constructor(private messageService: MessageService) {}

  ngOnInit() {
  }

  sendMessage() {
    this.messageService.sendMessage(this.username, this.messagesForm.get('messageContent')!.value).subscribe(mess => {
      this.messages.push(mess);
      this.messagesForm.reset();
    });
  }
}
