import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { Pagination } from '../../models/pagination';
import { MessageService } from '../../services/message.service';
import { PageEvent } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  messages: Message[] | null = [];
  pagination!: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      });
  }

  onPageChange(event: PageEvent) {
    if (this.pageNumber !== event.pageIndex) { //+1
      this.pageNumber = event.pageIndex + 1;
      this.loadMessages();
    }
  }

  deleteMessage(messageId: number) {
    this.dialogService.openDialog('Are you sure you want to delete this message?')
      .subscribe(res => {
        if (res) {
          this.messageService.deleteMessage(messageId).subscribe(() => {
            this.messages?.slice(this.messages.findIndex((message) => 
              message.id === messageId), 1);
          });
        }
      })
  }
}
