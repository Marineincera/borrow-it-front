import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanMonitoringPageComponent } from './loan-monitoring-page.component';

describe('LoanMonitoringPageComponent', () => {
  let component: LoanMonitoringPageComponent;
  let fixture: ComponentFixture<LoanMonitoringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanMonitoringPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanMonitoringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
