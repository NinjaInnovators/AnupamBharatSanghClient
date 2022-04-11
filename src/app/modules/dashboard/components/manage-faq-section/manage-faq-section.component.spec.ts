import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFaqSectionComponent } from './manage-faq-section.component';

describe('ManageFaqSectionComponent', () => {
  let component: ManageFaqSectionComponent;
  let fixture: ComponentFixture<ManageFaqSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFaqSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFaqSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
