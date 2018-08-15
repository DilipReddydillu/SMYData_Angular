import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualReceivablesComponent } from './individual-receivables.component';

describe('IndividualReceivablesComponent', () => {
  let component: IndividualReceivablesComponent;
  let fixture: ComponentFixture<IndividualReceivablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualReceivablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualReceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
