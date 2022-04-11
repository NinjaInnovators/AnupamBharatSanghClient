import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEventListComponent } from './home-event-list.component';

describe('HomeEventListComponent', () => {
  let component: HomeEventListComponent;
  let fixture: ComponentFixture<HomeEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEventListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
