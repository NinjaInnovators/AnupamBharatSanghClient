import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTellUsFormComponent } from './manage-tell-us-form.component';

describe('ManageTellUsFormComponent', () => {
  let component: ManageTellUsFormComponent;
  let fixture: ComponentFixture<ManageTellUsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTellUsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTellUsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
