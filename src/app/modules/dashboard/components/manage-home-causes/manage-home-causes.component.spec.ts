import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomeCausesComponent } from './manage-home-causes.component';

describe('ManageHomeCausesComponent', () => {
  let component: ManageHomeCausesComponent;
  let fixture: ComponentFixture<ManageHomeCausesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHomeCausesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHomeCausesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
