import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLoanComponent } from './private-loan.component';

describe('PrivateLoanComponent', () => {
  let component: PrivateLoanComponent;
  let fixture: ComponentFixture<PrivateLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
