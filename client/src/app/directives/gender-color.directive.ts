import { Directive, ElementRef, Input } from '@angular/core';
import { GenderColorType } from '../models/gender';

@Directive({
  selector: '[genderColor]'
})
export class GenderColorDirective {

  @Input() gender: GenderColorType = GenderColorType.female;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.gender === GenderColorType.female) {
      this.el.nativeElement.style.color = 'var(--female-color)';
    } else {
      this.el.nativeElement.style.color = 'var(--male-color)';
    }
  }


}
