import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FieldEntity } from './in-place-field.types';

@Component({
  selector: 'app-in-place-field-editor',
  templateUrl: './in-place-field-editor.component.html',
  styleUrls: ['./in-place-field-editor.component.css']
})
export class InPlaceFieldEditorComponent implements OnInit, OnDestroy { 

  @Input() rowId = undefined;
  @Input() value = undefined;
  @Input() colName: string = '';
  @Input() editRowId: any = undefined;
  @Output() valueChangeEventEmitter = new EventEmitter<FieldEntity>();
  startEditing: boolean = false;

  name = new FormControl('', {updateOn: 'blur'});
  valueChangeSub: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.valueChangeSub = this.name.valueChanges.subscribe(val => {
      this.valueChangeEventEmitter.emit({ id: this.rowId, col: this.colName, value: val});
    });
  }

  update(){
    this.valueChangeEventEmitter.emit({ id: this.rowId, col: this.colName, value: this.value});
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['value']){
      this.name.setValue(changes['value'].currentValue); 
    }     
    if(changes['editRowId'].currentValue === this.rowId){
      this.startEditing = true;
    }
  }

  ngOnDestroy(): void {
      this.valueChangeSub?.unsubscribe();
  }

}
