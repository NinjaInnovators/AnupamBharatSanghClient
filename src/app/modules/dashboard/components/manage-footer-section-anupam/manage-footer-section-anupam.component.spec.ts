import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFooterSectionAnupamComponent } from './manage-footer-section-anupam.component';

describe('ManageFooterSectionAnupamComponent', () => {
  let component: ManageFooterSectionAnupamComponent;
  let fixture: ComponentFixture<ManageFooterSectionAnupamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFooterSectionAnupamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFooterSectionAnupamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
