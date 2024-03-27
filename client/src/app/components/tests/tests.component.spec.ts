/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestsComponent } from './tests.component';

describe('TestsComponent', () => {
  let component: TestsComponent;
  let fixture: ComponentFixture<TestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render counter', () => {
    let num = 5;
    component.counter = num;

    fixture.detectChanges();

    let compiled = fixture.debugElement.query(By.css('.counter'));
    let el = compiled.nativeElement;

    expect(el.textContent).toContain(num.toString());
  })

  it('should add green class', () => {
    component.counter = 6;

    fixture.detectChanges();

    let compiled = fixture.debugElement.query(By.css('.counter'));
    let el: HTMLElement = compiled.nativeElement;

    expect(el.classList.contains('green')).toBeTruthy();
  })

  it('should increment counter', () => {
    let btn = fixture.debugElement.query(By.css('#increment'));
    btn.triggerEventHandler('click', null);

    expect(component.counter).toEqual(1);
  })
});
