import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakageCardComponent } from './breakage-card.component';

describe('BreakageCardComponent', () => {
  let component: BreakageCardComponent;
  let fixture: ComponentFixture<BreakageCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakageCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
