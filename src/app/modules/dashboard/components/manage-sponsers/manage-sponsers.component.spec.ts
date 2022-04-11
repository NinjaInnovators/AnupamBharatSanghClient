import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSponsersComponent } from './manage-sponsers.component';

describe('ManageSponsersComponent', () => {
  let component: ManageSponsersComponent;
  let fixture: ComponentFixture<ManageSponsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSponsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSponsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
