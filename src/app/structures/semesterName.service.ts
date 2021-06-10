import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { SemesterName } from './structure';

import { HandleErrors } from '../shared/handleErrors.service';
// import { StringReplaceService } from '../shared/stringreplace.service';

@Injectable({
  providedIn: 'root'
})

export class SemesterNameService {
  //url to the db API
  private generalUrl = `${environment.apiUrl}/structure/semesterNames`;

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



  getAll(): Observable<SemesterName[]> {
    return this.http.get<SemesterName[]>(`${this.generalUrl}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(
          this.handleErrors.handleError
        )
      );
  }

  getOne(id: string): Observable<SemesterName> {
    if (id === '') {
      return of(this.initializeIntake());
    }
    const idReplace = id;
    // console.log(idReplace);
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.get<SemesterName>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

  createOne(addnew: SemesterName): Observable<SemesterName> {
    const url = `${this.generalUrl}/add`;
    // return this.http.post<Admin>(url, admin,{ headers})
    return this.http.post<SemesterName>(url, addnew, this.httpOptions)
      .pipe(
        tap(data => console.log('CreateOne:' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }
  

  updateOne(editOld: SemesterName): Observable<SemesterName>{
    // onst idReplace = this.stringReplaceService.
    // const idReplace = this.forwardShlashReplace(editOld.intakeDate);
    const idReplace = editOld.semesterNum;
        const url = `${this.generalUrl}/${idReplace}`;
    return this.http.patch<SemesterName>(url, editOld, this.httpOptions)
    .pipe(
      tap(()=> console.log('update Admin' + editOld.semesterName)),
      map(() => editOld),
      catchError(this.handleErrors.handleError)
    );
  } 

  deleteOne(id: string): Observable<{}>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // const idReplace = this.stringReplaceService.forwardShlashReplace(id);
    ///const idReplace = this.forwardShlashReplace(id);
    const idReplace = id;
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.delete<SemesterName>(url, this.httpOptions)
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

  private initializeIntake(): SemesterName {
    return {
      semesterNum: null,
      semesterName: null
    };
  }

}