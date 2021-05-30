import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

// component
import { NavQuoteDisplayPageComponent } from './nav-quote-display-page.component';

describe('NavQuoteDisplayPageComponent', () => {
  let component: NavQuoteDisplayPageComponent;
  let fixture: ComponentFixture<NavQuoteDisplayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavQuoteDisplayPageComponent ],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavQuoteDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
