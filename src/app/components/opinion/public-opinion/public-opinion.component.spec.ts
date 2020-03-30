import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicOpinionComponent } from './public-opinion.component';

describe('PublicOpinionComponent', () => {
  let component: PublicOpinionComponent;
  let fixture: ComponentFixture<PublicOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
