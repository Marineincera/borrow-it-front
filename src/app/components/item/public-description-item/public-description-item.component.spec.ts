import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDescriptionItemComponent } from './public-description-item.component';

describe('PublicDescriptionItemComponent', () => {
  let component: PublicDescriptionItemComponent;
  let fixture: ComponentFixture<PublicDescriptionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicDescriptionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicDescriptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
