import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContactUsSectionComponent } from './manage-contact-us-section.component';

describe('ManageContactUsSectionComponent', () => {
  let component: ManageContactUsSectionComponent;
  let fixture: ComponentFixture<ManageContactUsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageContactUsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContactUsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
