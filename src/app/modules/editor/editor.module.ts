import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InPlaceFieldEditorComponent } from './in-place-field-editor/in-place-field-editor.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InPlaceFieldEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InPlaceFieldEditorComponent
  ]
})
export class EditorModule { }
