import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicEffortComponent } from './basic-effort.component';

describe('BasicEffortComponent', () => {
  let component: BasicEffortComponent;
  let fixture: ComponentFixture<BasicEffortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicEffortComponent]
    });
    fixture = TestBed.createComponent(BasicEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
