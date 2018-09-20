import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualUsersComponent } from './individual-users.component';

describe('IndividualUsersComponent', () => {
  let component: IndividualUsersComponent;
  let fixture: ComponentFixture<IndividualUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
