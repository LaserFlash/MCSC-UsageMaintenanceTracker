import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIncidentComponent } from './report-incident.component';

describe('ReportIncidentComponent', () => {
  let component: ReportIncidentComponent;
  let fixture: ComponentFixture<ReportIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
