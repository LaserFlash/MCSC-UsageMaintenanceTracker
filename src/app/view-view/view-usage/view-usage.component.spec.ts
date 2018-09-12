import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsageComponent } from './view-usage.component';

describe('ViewUsageComponent', () => {
  let component: ViewUsageComponent;
  let fixture: ComponentFixture<ViewUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
