import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSocialMediaLinkComponent } from './manage-social-media-link.component';

describe('ManageSocialMediaLinkComponent', () => {
  let component: ManageSocialMediaLinkComponent;
  let fixture: ComponentFixture<ManageSocialMediaLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSocialMediaLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSocialMediaLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
