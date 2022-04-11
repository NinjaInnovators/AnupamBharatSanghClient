import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBlogCommentComponent } from './manage-blog-comment.component';

describe('ManageBlogCommentComponent', () => {
  let component: ManageBlogCommentComponent;
  let fixture: ComponentFixture<ManageBlogCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBlogCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBlogCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
