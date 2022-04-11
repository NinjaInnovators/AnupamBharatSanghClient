import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomeEventCountSectionComponent } from './manage-home-event-count-section.component';

describe('ManageHomeEventCountSectionComponent', () => {
  let component: ManageHomeEventCountSectionComponent;
  let fixture: ComponentFixture<ManageHomeEventCountSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHomeEventCountSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHomeEventCountSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
