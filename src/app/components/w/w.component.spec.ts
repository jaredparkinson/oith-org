import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WComponent } from './w.component';

describe('WComponent', () => {
  let component: WComponent;
  let fixture: ComponentFixture<WComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
