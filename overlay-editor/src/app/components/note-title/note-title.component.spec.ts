import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTitleComponent } from './note-title.component';

describe('NoteTitleComponent', () => {
  let component: NoteTitleComponent;
  let fixture: ComponentFixture<NoteTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
