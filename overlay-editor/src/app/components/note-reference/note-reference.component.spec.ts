import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteReferenceComponent } from './note-reference.component';

describe('NoteReferenceComponent', () => {
  let component: NoteReferenceComponent;
  let fixture: ComponentFixture<NoteReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
