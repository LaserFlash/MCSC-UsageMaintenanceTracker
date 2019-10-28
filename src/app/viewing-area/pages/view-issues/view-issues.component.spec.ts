import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIssuesComponent } from './view-issues.component';

describe('ViewIssuesComponent', () => {
  let component: ViewIssuesComponent;
  let fixture: ComponentFixture<ViewIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
