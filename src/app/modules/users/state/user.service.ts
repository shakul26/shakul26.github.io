import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { UserQuery } from './user.query';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private userStore: UserStore, private http: HttpClient, private userQuery: UserQuery) {
  }


  get() {
    return this.http.get<User[]>('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').pipe(tap(entities => {
      this.userStore.set(entities);
    }));
  }

  addActive(ids: ID[]){
    this.userStore.addActive(ids);
  }
  
  removeActive(ids: ID[]){
    this.userStore.removeActive(ids);
  }

  updateField(id: any, fieldName: any, value: any){
    var ent :{ [key: string]: any } = {};
    ent[fieldName ] = value; 
    this.userStore.update(id, ent);
  }

  deleteByIds(id: any[]){
    this.userStore.remove(id);
  }
}
