import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGenderComponent } from './manage-gender.component';

describe('ManageGenderComponent', () => {
  let component: ManageGenderComponent;
  let fixture: ComponentFixture<ManageGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
