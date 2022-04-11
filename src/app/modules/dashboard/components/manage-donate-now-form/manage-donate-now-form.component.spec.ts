import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDonateNowFormComponent } from './manage-donate-now-form.component';

describe('ManageDonateNowFormComponent', () => {
  let component: ManageDonateNowFormComponent;
  let fixture: ComponentFixture<ManageDonateNowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDonateNowFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDonateNowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
