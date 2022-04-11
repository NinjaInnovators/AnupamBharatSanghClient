import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContactUsIconSectionComponent } from './manage-contact-us-icon-section.component';

describe('ManageContactUsIconSectionComponent', () => {
  let component: ManageContactUsIconSectionComponent;
  let fixture: ComponentFixture<ManageContactUsIconSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageContactUsIconSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContactUsIconSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
