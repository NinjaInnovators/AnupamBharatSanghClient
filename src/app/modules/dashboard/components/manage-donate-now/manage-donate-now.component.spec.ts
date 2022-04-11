import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDonateNowComponent } from './manage-donate-now.component';

describe('ManageDonateNowComponent', () => {
  let component: ManageDonateNowComponent;
  let fixture: ComponentFixture<ManageDonateNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDonateNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDonateNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
