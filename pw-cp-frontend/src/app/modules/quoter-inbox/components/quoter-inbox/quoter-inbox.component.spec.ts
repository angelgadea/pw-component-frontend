import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoterInboxComponent } from './quoter-inbox.component';

describe('QuoterInboxComponent', () => {
  let component: QuoterInboxComponent;
  let fixture: ComponentFixture<QuoterInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoterInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoterInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
