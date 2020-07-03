import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadPostListItemComponent } from './thread-post-list-item.component';

describe('ThreadPostListItemComponent', () => {
  let component: ThreadPostListItemComponent;
  let fixture: ComponentFixture<ThreadPostListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadPostListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadPostListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
