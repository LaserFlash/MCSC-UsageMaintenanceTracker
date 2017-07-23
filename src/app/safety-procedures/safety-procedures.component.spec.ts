import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyProceduresComponent } from './safety-procedures.component';

describe('SafetyProceduresComponent', () => {
  let component: SafetyProceduresComponent;
  let fixture: ComponentFixture<SafetyProceduresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafetyProceduresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
