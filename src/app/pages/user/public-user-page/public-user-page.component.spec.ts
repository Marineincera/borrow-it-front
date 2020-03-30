import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicUserPageComponent } from './public-user-page.component';

describe('PublicUserPageComponent', () => {
  let component: PublicUserPageComponent;
  let fixture: ComponentFixture<PublicUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
