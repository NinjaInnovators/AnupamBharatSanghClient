import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCausesDetailsComponent } from './manage-causes-details.component';

describe('ManageCausesDetailsComponent', () => {
  let component: ManageCausesDetailsComponent;
  let fixture: ComponentFixture<ManageCausesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCausesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCausesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
