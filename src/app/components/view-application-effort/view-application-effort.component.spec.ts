import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationEffortComponent } from './view-application-effort.component';

describe('ViewApplicationEffortComponent', () => {
  let component: ViewApplicationEffortComponent;
  let fixture: ComponentFixture<ViewApplicationEffortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewApplicationEffortComponent]
    });
    fixture = TestBed.createComponent(ViewApplicationEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
