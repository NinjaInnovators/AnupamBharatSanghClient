import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CausesListComponent } from './causes-list.component';

describe('CausesListComponent', () => {
  let component: CausesListComponent;
  let fixture: ComponentFixture<CausesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CausesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CausesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
