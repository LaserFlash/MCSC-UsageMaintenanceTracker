import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageGraphsComponent } from './usage-graphs.component';

describe('UsageGraphsComponent', () => {
  let component: UsageGraphsComponent;
  let fixture: ComponentFixture<UsageGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
