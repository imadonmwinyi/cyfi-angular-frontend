import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceRegistrationComponent } from './province-registration.component';

describe('ProvinceRegistrationComponent', () => {
  let component: ProvinceRegistrationComponent;
  let fixture: ComponentFixture<ProvinceRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvinceRegistrationComponent]
    });
    fixture = TestBed.createComponent(ProvinceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
