import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { Intake } from './structure';

import { HandleErrors } from '../shared/handleErrors.service';
// import { StringReplaceService } from '../shared/stringreplace.service';

@Injectable({
  providedIn: 'root'
})

export class IntakeService {
  //url to the db API
  private generalUrl = `${environment.apiUrl}/structure/intakes`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    'Access-Control-Allow-Credentails': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
    })
  }

  redirectUrl: string;
  // private stringReplaceService: StringReplaceService
  constructor(
    private http: HttpClient,
    private handleErrors: HandleErrors
  ) { }



  getAll_Intakes(): Observable<Intake[]> {
    return this.http.get<Intake[]>(`${this.generalUrl}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(
          this.handleErrors.handleError
        )
      );
  }

  getOne_Intake(id: string): Observable<Intake> {
    if (id === '') {
      return of(this.initializeIntake());
    }
    const idReplace = id;
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.get<Intake>(url)
      .pipe(
        tap(data => console.log('getIntake' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

  creates(addnew: Intake): Observable<Intake> {
    const url = `${this.generalUrl}/add`;
    // return this.http.post<Admin>(url, admin,{ headers})
    return this.http.post<Intake>(url, addnew, this.httpOptions)
      .pipe(
        tap(data => console.log('CreateProduct:' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }
  

  updates(editOld: Intake): Observable<Intake>{
    // onst idReplace = this.stringReplaceService.
    const idReplace = this.forwardShlashReplace(editOld.intakeDate);
        const url = `${this.generalUrl}/${idReplace}`;
    return this.http.patch<Intake>(url, editOld, this.httpOptions)
    .pipe(
      tap(()=> console.log('update Admin' + editOld.intakeName)),
      map(() => editOld),
      catchError(this.handleErrors.handleError)
    );
  } 

  deletes(id: string): Observable<{}>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // const idReplace = this.stringReplaceService.forwardShlashReplace(id);
    ///const idReplace = this.forwardShlashReplace(id);
    const idReplace = id;
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.delete<Intake>(url, this.httpOptions)
      .pipe(
        tap(data => console.log('Deletes: ' + id)),
        catchError(this.handleErrors.handleError)
        );
  }
  
  forwardShlashReplace(text:string) {
    //  console.log(text);   
    const txt1 = text.replace('/','_');
    const txt2 = txt1.replace('/','_');
     const txt3 = txt2.replace('/','_');
     console.log(txt3);
    return txt3;
  }

  private initializeIntake(): Intake {
    return {
      intakeDate: null,
      intakeName: null
    };
  }

}