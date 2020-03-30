import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanMonitoringComponent } from './loan-monitoring.component';

describe('LoanMonitoringComponent', () => {
  let component: LoanMonitoringComponent;
  let fixture: ComponentFixture<LoanMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
