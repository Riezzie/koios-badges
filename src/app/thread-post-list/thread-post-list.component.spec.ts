import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadPostListComponent } from './thread-post-list.component';

describe('ThreadPostListComponent', () => {
  let component: ThreadPostListComponent;
  let fixture: ComponentFixture<ThreadPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
