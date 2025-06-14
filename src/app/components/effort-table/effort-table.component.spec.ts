import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffortTableComponent } from './effort-table.component';

describe('EffortTableComponent', () => {
  let component: EffortTableComponent;
  let fixture: ComponentFixture<EffortTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EffortTableComponent]
    });
    fixture = TestBed.createComponent(EffortTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
