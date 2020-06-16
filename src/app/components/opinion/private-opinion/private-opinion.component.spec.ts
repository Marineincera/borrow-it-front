import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateOpinionComponent } from './private-opinion.component';

describe('PrivateOpinionComponent', () => {
  let component: PrivateOpinionComponent;
  let fixture: ComponentFixture<PrivateOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
