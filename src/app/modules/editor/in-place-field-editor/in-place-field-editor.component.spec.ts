import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InPlaceFieldEditorComponent } from './in-place-field-editor.component';

describe('InPlaceFieldEditorComponent', () => {
  let component: InPlaceFieldEditorComponent;
  let fixture: ComponentFixture<InPlaceFieldEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InPlaceFieldEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InPlaceFieldEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
