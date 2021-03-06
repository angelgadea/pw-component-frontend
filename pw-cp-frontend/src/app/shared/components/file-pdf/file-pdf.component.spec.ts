import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FilePdfComponent } from './file-pdf.component';

describe('FilePdfComponent', () => {
  let component: FilePdfComponent;
  let fixture: ComponentFixture<FilePdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilePdfComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
