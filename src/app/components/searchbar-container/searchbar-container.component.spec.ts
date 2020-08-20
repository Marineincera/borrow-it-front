import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarContainerComponent } from './searchbar-container.component';

describe('SearchbarContainerComponent', () => {
  let component: SearchbarContainerComponent;
  let fixture: ComponentFixture<SearchbarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
