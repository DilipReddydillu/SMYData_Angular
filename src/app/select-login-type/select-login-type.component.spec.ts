import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLoginTypeComponent } from './select-login-type.component';

describe('SelectLoginTypeComponent', () => {
  let component: SelectLoginTypeComponent;
  let fixture: ComponentFixture<SelectLoginTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLoginTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLoginTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
