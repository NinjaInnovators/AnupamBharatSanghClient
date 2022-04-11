import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVolunteersComponent } from './manage-volunteers.component';

describe('ManageVolunteersComponent', () => {
  let component: ManageVolunteersComponent;
  let fixture: ComponentFixture<ManageVolunteersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageVolunteersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
