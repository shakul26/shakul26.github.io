import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ID } from '@datorama/akita';
import { combineLatest, forkJoin, iif, map, Observable, of, take } from 'rxjs';
import { FieldEntity } from '../../editor/in-place-field-editor/in-place-field.types';
import { ColDef } from '../model/col-def';


/**
 * 
 * points to remember
 * 1. data supplied should have id attriibute as unique key
 */
@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {

  @Input() columns: ColDef[] = [];
  @Input() datasource$: Observable<any[]> = of();
  @Input() activeEntities$: Observable<ID[] | undefined> = of();
  @Output() activeEventEmitter = new EventEmitter<{ ids: ID[], state: boolean}>();
  @Output() onFieldValueEventEmitter = new EventEmitter<FieldEntity>();
  @Output() deleteEventEmitter = new EventEmitter<ID[]>();
  isAnyRowSelected$: Observable<boolean> = of(false);
  editRowId = undefined;
  p: any = 1;
  pageSize: number = 10;
  searchForm: any;

  constructor(private formBuilder: FormBuilder) {
  this.searchForm = this.formBuilder.group({
    search: '',
  });
}
  ngOnInit(): void {
    this.isAnyRowSelected$ = this.activeEntities$.pipe(map(res => {
      if(res !== undefined && res.length > 0){
        return true;
      }
      return false;
    }))
  }

  isRowChecked(row: any): Observable<boolean>{
    return this.activeEntities$.pipe(map(res => {
      if(res){
        return res?.includes(row?.id)
      }
      else{
        return false;
      }
    }));
  }

  toggleCheckbox(row: any, event$: any){
    this.activeEventEmitter.emit({ ids: [row.id], state: event$.target.checked });
  }

  hasAllRowsSelected(): Observable<boolean>{
   return combineLatest([this.datasource$, this.activeEntities$]).pipe(map( ([datasource, activeEntities]) =>  datasource?.length === activeEntities?.length));
  }

  toggleAllVisibleCheckbox(event$: any){
    console.log(this.p);
    const endIndex = (this.p as number) * this.pageSize;
    const startIndex = endIndex - this.pageSize;
    this.datasource$.pipe(take(1)).subscribe(res => {
      if(res){
        const idsTobeUpdated = res.slice(startIndex, endIndex).map(res => res.id);
        this.activeEventEmitter.emit({ ids: idsTobeUpdated, state: event$.target.checked });
      }
    })
  }

  onEdit(row: any){
    this.editRowId = row.id;
  }

  onDelete(row: any){
    this.deleteEventEmitter.emit([row.id]);
  }

  onValueChange(event$: FieldEntity){
    this.onFieldValueEventEmitter.emit(event$);
    this.editRowId = undefined;
  }

  deleteSelectedRows(){
    this.activeEntities$.pipe(take(1)).subscribe(ids => this.deleteEventEmitter.emit(ids));
  }
}
