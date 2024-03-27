import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {

  posts = []
  message!: string

  constructor(private service: PostsService) {
  }

  ngOnInit(): void {
    this.service.fetch().subscribe((p: any) => {
      this.posts = p
    })
  }

  add(title: string) {
    const post = { title }
    this.service.create(post).subscribe((p: never | null) => {
      this.posts.push(p as never)
    }, err => this.message = err)
  }

  delete(id: number) {
    if (window.confirm('Are you sure?')) {
      this.service.remove(id).subscribe()
    }
  }

}
