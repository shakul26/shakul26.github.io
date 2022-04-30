import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { TableModule } from '../table/table.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    HttpClientModule
  ]
})
export class UsersModule { }
