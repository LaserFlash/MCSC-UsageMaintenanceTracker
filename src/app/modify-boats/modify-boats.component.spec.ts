import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBoatsComponent } from './modify-boats.component';

describe('ModifyBoatsComponent', () => {
  let component: ModifyBoatsComponent;
  let fixture: ComponentFixture<ModifyBoatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyBoatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
