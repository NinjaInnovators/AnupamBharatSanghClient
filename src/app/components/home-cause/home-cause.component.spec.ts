import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCauseComponent } from './home-cause.component';

describe('HomeCauseComponent', () => {
  let component: HomeCauseComponent;
  let fixture: ComponentFixture<HomeCauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCauseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
