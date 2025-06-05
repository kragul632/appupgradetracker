import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddataComponent } from './adddata.component';

describe('AdddataComponent', () => {
  let component: AdddataComponent;
  let fixture: ComponentFixture<AdddataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddataComponent]
    });
    fixture = TestBed.createComponent(AdddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
