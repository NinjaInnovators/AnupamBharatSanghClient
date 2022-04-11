import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContactUsFormComponent } from './manage-contact-us-form.component';

describe('ManageContactUsFormComponent', () => {
  let component: ManageContactUsFormComponent;
  let fixture: ComponentFixture<ManageContactUsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageContactUsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContactUsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
