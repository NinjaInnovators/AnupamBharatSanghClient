import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomeDonationSectionComponent } from './manage-home-donation-section.component';

describe('ManageHomeDonationSectionComponent', () => {
  let component: ManageHomeDonationSectionComponent;
  let fixture: ComponentFixture<ManageHomeDonationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHomeDonationSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHomeDonationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
