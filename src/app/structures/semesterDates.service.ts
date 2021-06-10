import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { SemesterDates } from './structure';

import { HandleErrors } from '../shared/handleErrors.service';
// import { StringReplaceService } from '../shared/stringreplace.service';

@Injectable({
  providedIn: 'root'
})

export class SemesterDatesService {
  //url to the db API
  private generalUrl = `${environment.apiUrl}/structure/semesterDates`;

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



  getAll(): Observable<SemesterDates[]> {
    return this.http.get<SemesterDates[]>(`${this.generalUrl}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(
          this.handleErrors.handleError
        )
      );
  }

  getOne(id: string): Observable<SemesterDates> {
    if (id === '') {
      return of(this.initializeIntake());
    }
    const idReplace = id;
    // console.log(idReplace);
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.get<SemesterDates>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

  createOne(addnew: SemesterDates): Observable<SemesterDates> {
    const url = `${this.generalUrl}/add`;
    // return this.http.post<Admin>(url, admin,{ headers})
    return this.http.post<SemesterDates>(url, addnew, this.httpOptions)
      .pipe(
        tap(data => console.log('CreateOne:' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }
  

  updateOne(editOld: SemesterDates): Observable<SemesterDates>{
    // onst idReplace = this.stringReplaceService.
    // const idReplace = this.forwardShlashReplace(editOld.intakeDate);
    const idReplace = editOld.semesterDateCode;
        const url = `${this.generalUrl}/${idReplace}`;
    return this.http.patch<SemesterDates>(url, editOld, this.httpOptions)
    .pipe(
      tap(()=> console.log('update Admin' + editOld.semesterDateCode)),
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
    return this.http.delete<SemesterDates>(url, this.httpOptions)
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

  private initializeIntake(): SemesterDates {
    return {
      semesterDateCode: null, 
      semesterDateName: null, 
      startDate: null, 
      endDate: null, 
      studyProgramme: null
    };
  }

}