import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-dog',
  templateUrl: './animated-dog.component.html',
  styleUrls: ['./animated-dog.component.scss']
})
export class AnimatedDogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  playBarkSound() {
    const audio = new Audio('assets/sounds/bark.mp3');
    audio.play();
  }

}
