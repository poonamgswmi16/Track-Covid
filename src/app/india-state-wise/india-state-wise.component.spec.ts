import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaStateWiseComponent } from './india-state-wise.component';

describe('IndiaStateWiseComponent', () => {
  let component: IndiaStateWiseComponent;
  let fixture: ComponentFixture<IndiaStateWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiaStateWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiaStateWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
