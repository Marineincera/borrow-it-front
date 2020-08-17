import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendshipDemandComponent } from './friendship-demand.component';

describe('FriendshipDemandComponent', () => {
  let component: FriendshipDemandComponent;
  let fixture: ComponentFixture<FriendshipDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendshipDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendshipDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
