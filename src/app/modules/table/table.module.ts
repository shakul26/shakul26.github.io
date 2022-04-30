import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { EditorModule } from '../editor/editor.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from './search-filter/search-filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomTableComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    EditorModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomTableComponent
  ]
})
export class TableModule { }
