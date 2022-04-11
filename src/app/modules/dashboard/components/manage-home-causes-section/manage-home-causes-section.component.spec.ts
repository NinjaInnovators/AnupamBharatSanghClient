import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomeCausesSectionComponent } from './manage-home-causes-section.component';

describe('ManageHomeCausesSectionComponent', () => {
  let component: ManageHomeCausesSectionComponent;
  let fixture: ComponentFixture<ManageHomeCausesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHomeCausesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHomeCausesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
