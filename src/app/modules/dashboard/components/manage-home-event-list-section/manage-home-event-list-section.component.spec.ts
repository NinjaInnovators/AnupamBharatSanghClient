import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomeEventListSectionComponent } from './manage-home-event-list-section.component';

describe('ManageHomeEventListSectionComponent', () => {
  let component: ManageHomeEventListSectionComponent;
  let fixture: ComponentFixture<ManageHomeEventListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHomeEventListSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHomeEventListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
