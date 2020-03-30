import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateItemComponent } from './private-item.component';

describe('PrivateItemComponent', () => {
  let component: PrivateItemComponent;
  let fixture: ComponentFixture<PrivateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
