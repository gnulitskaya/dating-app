import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(public messageService: MessageService,
    public route: ActivatedRoute
  ) {
    this.checkRoute();
  }

  checkRoute() {
    this.route.params.subscribe(params => {
      console.log('params', params);
      this.username = params['name'];
    });
  }

  ngOnInit() {
  }

  sendMessage() {
    this.messageService.sendMessage(this.username, this.messagesForm.get('messageContent')!.value).then(() => {
      this.messagesForm.reset();
    });
  }
}
