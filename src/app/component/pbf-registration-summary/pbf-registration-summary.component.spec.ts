import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbfRegistrationSummaryComponent } from './pbf-registration-summary.component';

describe('PbfRegistrationSummaryComponent', () => {
  let component: PbfRegistrationSummaryComponent;
  let fixture: ComponentFixture<PbfRegistrationSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PbfRegistrationSummaryComponent]
    });
    fixture = TestBed.createComponent(PbfRegistrationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
