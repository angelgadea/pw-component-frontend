import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatePreferentialComponent } from './rate-preferential.component';

describe('RatePreferentialComponent', () => {
  let component: RatePreferentialComponent;
  let fixture: ComponentFixture<RatePreferentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatePreferentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatePreferentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
