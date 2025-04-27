import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DohComponent } from './doh.component';

describe('DohComponent', () => {
  let component: DohComponent;
  let fixture: ComponentFixture<DohComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DohComponent]
    });
    fixture = TestBed.createComponent(DohComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
