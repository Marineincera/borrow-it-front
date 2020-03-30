import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCreationPageComponent } from './item-creation-page.component';

describe('ItemCreationPageComponent', () => {
  let component: ItemCreationPageComponent;
  let fixture: ComponentFixture<ItemCreationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCreationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
