import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEffortComponent } from './application-effort.component';

describe('ApplicationEffortComponent', () => {
  let component: ApplicationEffortComponent;
  let fixture: ComponentFixture<ApplicationEffortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationEffortComponent]
    });
    fixture = TestBed.createComponent(ApplicationEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
