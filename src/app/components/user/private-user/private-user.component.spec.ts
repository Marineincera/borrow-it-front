import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUserComponent } from './private-user.component';

describe('PrivateUserComponent', () => {
  let component: PrivateUserComponent;
  let fixture: ComponentFixture<PrivateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
