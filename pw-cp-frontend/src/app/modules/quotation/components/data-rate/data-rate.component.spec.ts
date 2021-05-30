import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

// component
import { DataRateComponent } from './data-rate.component';

describe('DataRateComponent', () => {
  let component: DataRateComponent;
  let fixture: ComponentFixture<DataRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataRateComponent ],
      imports: [ FormsModule, BrowserModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
