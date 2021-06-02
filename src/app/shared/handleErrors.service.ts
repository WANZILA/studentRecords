import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
// import {catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HandleErrors {
   // private  handleError(err): Observable<never>
   handleError(err): Observable<any> {
    
    let errorMessage: string;
    if(err.error instanceof ErrorEvent ){ 
      //on client side handle the errror accordingly
      errorMessage = `An error occured: ${err.error.message}`;
    } else{
      //backend returns unsuccessfull response code 
      errorMessage = `Backend returned code ${err.status}: ${err.error}`;
    }
   // console.error(err);
    return throwError(errorMessage);
  }
}
