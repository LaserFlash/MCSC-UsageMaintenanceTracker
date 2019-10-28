import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortFilterBarComponent } from './sort-filter-bar.component';

describe('SortFilterBarComponent', () => {
  let component: SortFilterBarComponent;
  let fixture: ComponentFixture<SortFilterBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortFilterBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
