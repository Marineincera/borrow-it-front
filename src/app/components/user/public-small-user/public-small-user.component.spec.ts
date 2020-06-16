import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSmallUserComponent } from './public-small-user.component';

describe('PublicSmallUserComponent', () => {
  let component: PublicSmallUserComponent;
  let fixture: ComponentFixture<PublicSmallUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicSmallUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSmallUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
