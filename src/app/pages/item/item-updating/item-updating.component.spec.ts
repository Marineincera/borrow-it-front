import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUpdatingComponent } from './item-updating.component';

describe('ItemUpdatingComponent', () => {
  let component: ItemUpdatingComponent;
  let fixture: ComponentFixture<ItemUpdatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemUpdatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUpdatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
