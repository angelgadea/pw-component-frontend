import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// components
import { DataClientComponent } from './data-client.component';

describe('DataClientComponent', () => {
  let component: DataClientComponent;
  let fixture: ComponentFixture<DataClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataClientComponent ],
      imports: [ FormsModule, BrowserModule, HttpClientModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
