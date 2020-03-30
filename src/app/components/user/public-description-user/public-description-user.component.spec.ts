import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDescriptionUserComponent } from './public-description-user.component';

describe('PublicDescriptionUserComponent', () => {
  let component: PublicDescriptionUserComponent;
  let fixture: ComponentFixture<PublicDescriptionUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicDescriptionUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicDescriptionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
