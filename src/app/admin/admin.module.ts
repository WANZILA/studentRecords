import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminResetPasswordComponent } from './admin-reset-password/admin-reset-password.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminDeleteComponent } from './admin-delete/admin-delete.component';
import { SharedModule } from '../shared/shared/shared.module';



@NgModule({
  declarations: [
    AdminResetPasswordComponent, 
    AdminEditComponent, 
    AdminSearchComponent, 
    AdminAddComponent, 
    AdminDeleteComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
