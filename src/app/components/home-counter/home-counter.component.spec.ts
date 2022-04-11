import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCounterComponent } from './home-counter.component';

describe('HomeCounterComponent', () => {
  let component: HomeCounterComponent;
  let fixture: ComponentFixture<HomeCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
