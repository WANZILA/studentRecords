import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminResetPasswordComponent } from './admin-reset-password/admin-reset-password.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminDeleteComponent } from './admin-delete/admin-delete.component';




@NgModule({
  declarations: [
    AdminResetPasswordComponent, 
    AdminEditComponent, 
    AdminSearchComponent, 
    AdminAddComponent, 
    AdminDeleteComponent],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
