import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  counter: number = 0;
  constructor() { }

  ngOnInit() {
  }

  increment() {
    this.counter++;
  }
}
