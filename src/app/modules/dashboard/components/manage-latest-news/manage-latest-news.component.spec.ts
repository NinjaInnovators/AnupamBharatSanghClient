import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLatestNewsComponent } from './manage-latest-news.component';

describe('ManageLatestNewsComponent', () => {
  let component: ManageLatestNewsComponent;
  let fixture: ComponentFixture<ManageLatestNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLatestNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLatestNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
