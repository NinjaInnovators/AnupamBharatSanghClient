import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHelpComponent } from './manage-help.component';

describe('ManageHelpComponent', () => {
  let component: ManageHelpComponent;
  let fixture: ComponentFixture<ManageHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
