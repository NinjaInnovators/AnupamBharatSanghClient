import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVolunteersSectionComponent } from './manage-volunteers-section.component';

describe('ManageVolunteersSectionComponent', () => {
  let component: ManageVolunteersSectionComponent;
  let fixture: ComponentFixture<ManageVolunteersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageVolunteersSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVolunteersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
