import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { Pagination } from '../../models/pagination';
import { MessageService } from '../../services/message.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  messages: Message[] | null = [];
  pagination!: Pagination;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
      });
  }

  onPageChange(event: PageEvent) {
    if (this.pageNumber !== event.pageIndex) { //+1
      this.pageNumber = event.pageIndex + 1;
      this.loadMessages();
    }
  }

  deleteMessage(messageId: number) {}

}
