import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomeWelcomeSectionComponent } from './manage-home-welcome-section.component';

describe('ManageHomeWelcomeSectionComponent', () => {
  let component: ManageHomeWelcomeSectionComponent;
  let fixture: ComponentFixture<ManageHomeWelcomeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHomeWelcomeSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHomeWelcomeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
