import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbfRegistrationComponent } from './pbf-registration.component';

describe('PbfRegistrationComponent', () => {
  let component: PbfRegistrationComponent;
  let fixture: ComponentFixture<PbfRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PbfRegistrationComponent]
    });
    fixture = TestBed.createComponent(PbfRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
