import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicEffortSubmitComponent } from './basic-effort-submit.component';

describe('BasicEffortSubmitComponent', () => {
  let component: BasicEffortSubmitComponent;
  let fixture: ComponentFixture<BasicEffortSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicEffortSubmitComponent]
    });
    fixture = TestBed.createComponent(BasicEffortSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
