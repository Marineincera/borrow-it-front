import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSmallItemComponent } from './public-small-item.component';

describe('PublicSmallItemComponent', () => {
  let component: PublicSmallItemComponent;
  let fixture: ComponentFixture<PublicSmallItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicSmallItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSmallItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
