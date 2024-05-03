import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {
  constructor() { }

  public canon(): void {
    let scalar = 2;
    // ['🐾', '🦴', '🐶']
    let shape = confetti.shapeFromText({ text: '🐾', scalar });
    confetti({
      // shapes: [shape],
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
      scalar: scalar,
    });
  }
}
