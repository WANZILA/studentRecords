import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { EditApplicationComponent } from './edit-application/edit-application.component';

@Injectable({
  providedIn:'root'
})

export class EditApplicationGuard implements CanDeactivate<EditApplicationComponent>{

  canDeactivate(component: EditApplicationComponent): Observable<boolean> | Promise<boolean> | boolean{
    if(component.generalForm.dirty){
      const studentName = component.generalForm.get('fname').value || 'Register New student';
      return confirm(`Navigate away and lose all changes to ${studentName}`);
    }
    return true;
  }
}