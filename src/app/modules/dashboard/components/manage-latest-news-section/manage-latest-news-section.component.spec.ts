import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLatestNewsSectionComponent } from './manage-latest-news-section.component';

describe('ManageLatestNewsSectionComponent', () => {
  let component: ManageLatestNewsSectionComponent;
  let fixture: ComponentFixture<ManageLatestNewsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLatestNewsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLatestNewsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
