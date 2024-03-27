/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Test3Component } from './test3.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

class RouterStub { navigate(path: string){}}
class ActivatedRouteStub { params: Observable<Params> = of({}) }

describe('Test3Component', () => {
  let component: Test3Component;
  let fixture: ComponentFixture<Test3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Test3Component ],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    component.goBack();

    expect(spy).toHaveBeenCalledWith(['/posts']);
  })
});
