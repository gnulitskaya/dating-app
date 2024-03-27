/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Test2Component } from './test2.component';
import { PostsService } from './posts.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('Test2Component', () => {
  let component: Test2Component;
  let fixture: ComponentFixture<Test2Component>;
  let service: PostsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Test2Component ],
      providers: [PostsService],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Test2Component);
    component = fixture.componentInstance;
    service = TestBed.inject(PostsService);
  }));

  it('should fetch the posts', () => {
    const posts: any = [1, 2, 3];
    spyOn(service, 'fetch').and.returnValue(of(posts));

    fixture.detectChanges();

    expect(component.posts).toEqual(posts);
  })
});
