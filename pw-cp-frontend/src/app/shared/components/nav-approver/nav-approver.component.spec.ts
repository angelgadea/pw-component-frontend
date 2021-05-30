import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// component
import { NavApproverComponent } from './nav-approver.component';

describe('NavApproverComponent', () => {
  let component: NavApproverComponent;
  let fixture: ComponentFixture<NavApproverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavApproverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
