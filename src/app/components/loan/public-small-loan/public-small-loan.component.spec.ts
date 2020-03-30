import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSmallLoanComponent } from './public-small-loan.component';

describe('PublicSmallLoanComponent', () => {
  let component: PublicSmallLoanComponent;
  let fixture: ComponentFixture<PublicSmallLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicSmallLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSmallLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
