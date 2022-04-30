import { Component, OnInit } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { FieldEntity } from '../../editor/in-place-field-editor/in-place-field.types';
import { ColDef } from '../../table/model/col-def';
import { User } from '../state/user.model';
import { UserQuery } from '../state/user.query';
import { UserService } from '../state/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  columns: ColDef[] = [];
  users$: Observable<User[]>;
  activeUserIds$: Observable<ID[] | undefined>;

  constructor(private userService: UserService, private userQuery: UserQuery) {
    this.users$ = this.userQuery.selectAll();
    this.activeUserIds$ = this.userQuery.selectActiveId();
   }

  ngOnInit(): void {
    this.initColoumns();
    this.loadUsers();
  }

  initColoumns(){
    this.columns = [
      { name: "checkbox", displayName: '', isCheckbox : true, isAction: false, minWidth: "2px" },
      { name: "name", displayName: 'Name', isCheckbox : false, isAction: false, minWidth: "250px" },
      { name: "email", displayName: 'Email', isCheckbox : false, isAction: false, minWidth: "250px" },  
      { name: "role", displayName: 'Role  ', isCheckbox : false, isAction: false, minWidth: "250px" },
      { name: "edit", displayName: 'Action', isCheckbox : false, isAction: true, minWidth: "5px" },
      { name: "delete", displayName: 'Delete', isCheckbox : false, isAction: true, minWidth: "5px" },
    ];
  }

  loadUsers(){
    this.userService.get().subscribe();
  }

  toggleActive(event: {ids: ID[], state: boolean}){
    if(event && event.state){
      this.userService.addActive(event.ids);
    }else {
      //turn off given ids
      this.userService.removeActive(event.ids);
    }
  }

  updateFieldValue(event: FieldEntity){
    this.userService.updateField(event.id, event.col, event.value);
  }

  deleteUser(id: any[]){
    this.userService.deleteByIds(id);
  }
}
