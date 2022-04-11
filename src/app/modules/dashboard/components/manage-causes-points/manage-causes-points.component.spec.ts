import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCausesPointsComponent } from './manage-causes-points.component';

describe('ManageCausesPointsComponent', () => {
  let component: ManageCausesPointsComponent;
  let fixture: ComponentFixture<ManageCausesPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCausesPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCausesPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
