import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEffortComponent } from './add-effort.component';

describe('AddEffortComponent', () => {
  let component: AddEffortComponent;
  let fixture: ComponentFixture<AddEffortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEffortComponent]
    });
    fixture = TestBed.createComponent(AddEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
