import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptIntroductionComponent } from './concept-introduction.component';

describe('ConceptIntroductionComponent', () => {
  let component: ConceptIntroductionComponent;
  let fixture: ComponentFixture<ConceptIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
