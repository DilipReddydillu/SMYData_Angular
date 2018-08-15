import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPayablesComponent } from './individual-payables.component';

describe('IndividualPayablesComponent', () => {
  let component: IndividualPayablesComponent;
  let fixture: ComponentFixture<IndividualPayablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualPayablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPayablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
