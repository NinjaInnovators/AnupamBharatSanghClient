import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMissionAndGoalsComponent } from './manage-mission-and-goals.component';

describe('ManageMissionAndGoalsComponent', () => {
  let component: ManageMissionAndGoalsComponent;
  let fixture: ComponentFixture<ManageMissionAndGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMissionAndGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMissionAndGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
