import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpStatsComponent } from './tmp-stats.component';

describe('TmpStatsComponent', () => {
  let component: TmpStatsComponent;
  let fixture: ComponentFixture<TmpStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmpStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmpStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
