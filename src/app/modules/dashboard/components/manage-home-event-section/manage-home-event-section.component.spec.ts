import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomeEventSectionComponent } from './manage-home-event-section.component';

describe('ManageHomeEventSectionComponent', () => {
  let component: ManageHomeEventSectionComponent;
  let fixture: ComponentFixture<ManageHomeEventSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHomeEventSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHomeEventSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
