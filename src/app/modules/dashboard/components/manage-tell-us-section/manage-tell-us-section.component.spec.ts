import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTellUsSectionComponent } from './manage-tell-us-section.component';

describe('ManageTellUsSectionComponent', () => {
  let component: ManageTellUsSectionComponent;
  let fixture: ComponentFixture<ManageTellUsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTellUsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTellUsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
