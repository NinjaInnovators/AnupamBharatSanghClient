import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFaqListComponent } from './manage-faq-list.component';

describe('ManageFaqListComponent', () => {
  let component: ManageFaqListComponent;
  let fixture: ComponentFixture<ManageFaqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFaqListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFaqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
